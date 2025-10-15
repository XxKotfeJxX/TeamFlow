import React from "react";
import CalendarDayCell from "./CalendarDayCell";
import WeekNumberCell from "./WeekNumberCell";
import type { Event } from "../../models/mockDB/calendar";

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDayClick: (day: Date) => void;
  onWeekClick?: (weekStart: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  events,
  onDayClick,
  onWeekClick,
}) => {
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startDay = new Date(startOfMonth);
  startDay.setDate(startOfMonth.getDate() - ((startOfMonth.getDay() + 6) % 7));

  const weeks: Date[][] = [];
  const dayCursor = new Date(startDay);

  while (dayCursor <= endOfMonth || weeks.length < 6) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(dayCursor));
      dayCursor.setDate(dayCursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return (
    <div className="grid grid-cols-[40px_repeat(7,_1fr)] gap-1">
      <div></div>
      {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day) => (
        <div key={day} className="text-center font-semibold text-black">
          {day}
        </div>
      ))}

      {weeks.map((week, wi) => {
        const weekStart = week[0];
        return (
          <React.Fragment key={wi}>
            <WeekNumberCell
              weekNumber={wi + 1}
              onClick={() => onWeekClick?.(weekStart)}
            />
            {week.map((day) => {
              const dayEvents = events.filter(
                (ev) =>
                  new Date(ev.startDate).getFullYear() === day.getFullYear() &&
                  new Date(ev.startDate).getMonth() === day.getMonth() &&
                  new Date(ev.startDate).getDate() === day.getDate()
              );
              const isToday = day.toDateString() === new Date().toDateString();
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();

              return (
                <CalendarDayCell
                  key={day.toISOString()}
                  day={day}
                  events={dayEvents}
                  isToday={isToday}
                  isCurrentMonth={isCurrentMonth}
                  onClick={() => onDayClick(day)}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
