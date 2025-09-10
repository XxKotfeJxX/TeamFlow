// eventUtils.ts
// Логіка для розташування подій у візуальному таймлайні (тиждень/день).
// Алгоритм: для кожного дня беремо всі події, групуємо перекриваючі в "стовпці" і розраховуємо
// left/width колонки для CSS (у відсотках). Це класичний алгоритм "calendar event layout".

import { CalendarEvent } from '../models/Event';

/**
 * EventLayout
 * leftPercent, widthPercent - позиціювання в контейнері денної колонки.
 * topPx, heightPx - позиції по вертикалі (в пікселях) розраховані від часу і масштабу (хочемо, щоб компонент їх використовував).
 */
export interface EventLayout {
  event: CalendarEvent;
  leftPercent: number;
  widthPercent: number;
  columnIndex: number;
  columnCount: number;
}

/**
 * layoutEventsForDay
 * Вхід: масив подій, які лежать в межах одного видимого дня (припускаємо, що події вже відфільтровані)
 * Повертає масив EventLayout з полями leftPercent/widthPercent (0..100)
 *
 * Простий, але робочий алгоритм:
 *  - Динамічно групуємо перекриваючі події в "конфліктні групи".
 *  - У межах групи ранжуємо події в колонки (greedy).
 *  - Кожній колонці даємо width = 100 / колонкиCount, left = columnIndex * width
 *
 * Це дає гарний вигляд для більшості випадків.
 */
export function layoutEventsForDay(events: CalendarEvent[]): EventLayout[] {
  // сортуємо за початком, потім за кінцем
  const sorted = [...events].sort((a,b) => a.start.getTime() - b.start.getTime() || a.end.getTime() - b.end.getTime());

  // знайдемо conflict groups
  const groups: CalendarEvent[][] = [];
  for (const ev of sorted) {
    let placed = false;
    for (const group of groups) {
      // якщо ev перекривається з будь-яким елементом групи => додаємо в цю групу
      if (group.some(g => g.overlapsWith(ev))) {
        group.push(ev);
        placed = true;
        break;
      }
    }
    if (!placed) groups.push([ev]);
  }

  const layouts: EventLayout[] = [];

  // Для кожної групи робимо колонкове розміщення
  for (const group of groups) {
    // greedy column assignment
    const columns: CalendarEvent[][] = [];
    for (const ev of group) {
      let placed = false;
      for (let i = 0; i < columns.length; i++) {
        // якщо ev не перекривається з останнім в колонці, можемо його поставити сюди
        const col = columns[i];
        const last = col[col.length - 1];
        if (!last.overlapsWith(ev)) {
          col.push(ev);
          placed = true;
          break;
        }
      }
      if (!placed) {
        columns.push([ev]);
      }
    }

    const columnCount = columns.length;
    // побудувати layout для кожного event (знаходимо індекс колонки)
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      for (const ev of columns[colIndex]) {
        layouts.push({
          event: ev,
          leftPercent: (colIndex / columnCount) * 100,
          widthPercent: 100 / columnCount,
          columnIndex: colIndex,
          columnCount,
        });
      }
    }
  }

  return layouts;
}

/**
 * calculateTopHeightForEvent
 * Допоміжна функція: за стартом/кінцем і scale (наприклад, pxPerMinute) повертає topPx і heightPx.
 */
export function calculateTopHeightForEvent(event: CalendarEvent, dayStartHour = 0, pxPerMinute = 1): { top: number; height: number } {
  const startMinutes = (event.start.getHours() - dayStartHour) * 60 + event.start.getMinutes();
  const endMinutes = (event.end.getHours() - dayStartHour) * 60 + event.end.getMinutes();
  const top = Math.max(0, startMinutes * pxPerMinute);
  const height = Math.max(1, (endMinutes - startMinutes) * pxPerMinute);
  return { top, height };
}
