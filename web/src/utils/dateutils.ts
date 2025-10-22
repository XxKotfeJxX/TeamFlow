// dateUtils.ts
// Утиліти роботи з датами для календаря.
// Тижні нумеруються в межах місяця (1..5), weekStartsOn = 1 (понеділок)

export const MS_IN_DAY = 24 * 60 * 60 * 1000;

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday

export const DEFAULT_WEEK_STARTS_ON: WeekDay = 1; // понеділок

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

/**
 * generateMonthGrid
 * Повертає масив рядків (weeks). Кожен рядок - масив із 7 Date | null
 * Також повертає локальну нумерацію тижнів від 1 (ліворуч).
 */
export function generateMonthGrid(
  monthDate: Date,
  weekStartsOn = DEFAULT_WEEK_STARTS_ON
) {
  const start = startOfMonth(monthDate);
  // знайдемо перший день видимої сітки (припадає на weekStartsOn того тижня)
  const dayOfWeek = start.getDay(); // 0..6
  // offset від початку місяця до початку видимої сітки
  const offset = (((dayOfWeek - weekStartsOn) % 7) + 7) % 7;
  const gridStart = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate() - offset
  );

  const weeks: Date[][] = [];
  const cursor = new Date(gridStart);
  // За максимум 6 рядків (іноді 5)
  for (let week = 0; week < 6; week++) {
    const weekRow: Date[] = [];
    for (let d = 0; d < 7; d++) {
      weekRow.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    // перевіримо, чи цей рядок повністю лежить за межами місяця (тоді припиняємо)
    const anyInMonth = weekRow.some(
      (d) => d.getMonth() === monthDate.getMonth()
    );
    weeks.push(weekRow);
    if (!anyInMonth) break;
  }

  // створимо масив номерів тижнів у межах місяця: номер тижня = порядковий номер рядка, де є хоча б один день місяця
  const weekNumbers: number[] = [];
  let counter = 1;
  for (const row of weeks) {
    const anyIn = row.some((d) => d.getMonth() === monthDate.getMonth());
    weekNumbers.push(anyIn ? counter++ : counter);
  }

  return { weeks, weekNumbers };
}

/**
 * getWeekNumberInMonth
 * Повертає номер тижня в місяці (1..5) для переданої дати, за правилом вище.
 */
export function getWeekNumberInMonth(
  date: Date,
  weekStartsOn = DEFAULT_WEEK_STARTS_ON
): number {
  const { weeks } = generateMonthGrid(date, weekStartsOn);
  for (let i = 0; i < weeks.length; i++) {
    if (
      weeks[i].some(
        (d) =>
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate()
      )
    ) {
      // count only weeks that have days from the month before this one? we numbered earlier
      // here just return i+1 but we want to start numbering from first week that contains any day of month
      // compute index of first week that contains month
      const firstIndex = weeks.findIndex((w) =>
        w.some((dd) => dd.getMonth() === date.getMonth())
      );
      return i - firstIndex + 1;
    }
  }
  return 1;
}

/**
 * startOfWeekForDate
 * Повертає Date на початок тижня (00:00) залежно від weekStartsOn
 */
export function startOfWeekForDate(
  date: Date,
  weekStartsOn = DEFAULT_WEEK_STARTS_ON
): Date {
  const d = new Date(date);
  const diff = (d.getDay() - weekStartsOn + 7) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
