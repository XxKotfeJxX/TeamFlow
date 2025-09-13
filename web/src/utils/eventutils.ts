// eventUtils.ts
import { CalendarEvent } from '../models/Event';

export interface EventLayout {
  event: CalendarEvent;
  leftPercent: number;
  widthPercent: number;
  columnIndex: number;
  columnCount: number;
}

export function layoutEventsForDay(events: CalendarEvent[]): EventLayout[] {
  // сортуємо за початком, потім за кінцем
  const sorted = [...events].sort(
    (a, b) =>
      a.startTime.getTime() - b.startTime.getTime() ||
      a.endTime.getTime() - b.endTime.getTime()
  );

  // знайдемо conflict groups
  const groups: CalendarEvent[][] = [];
  for (const ev of sorted) {
    let placed = false;
    for (const group of groups) {
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
    const columns: CalendarEvent[][] = [];
    for (const ev of group) {
      let placed = false;
      for (let i = 0; i < columns.length; i++) {
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

export function calculateTopHeightForEvent(
  event: CalendarEvent,
  dayStartHour = 0,
  pxPerMinute = 1
): { top: number; height: number } {
  const startMinutes =
    (event.startTime.getHours() - dayStartHour) * 60 + event.startTime.getMinutes();
  const endMinutes =
    (event.endTime.getHours() - dayStartHour) * 60 + event.endTime.getMinutes();
  const top = Math.max(0, startMinutes * pxPerMinute);
  const height = Math.max(1, (endMinutes - startMinutes) * pxPerMinute);
  return { top, height };
}
