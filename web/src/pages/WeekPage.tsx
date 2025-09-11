import React from "react";
import DayColumn from "../components/week/DayColumn";
import { CalendarEvent } from "../models/Event";

interface WeekPageProps {
  weekStart: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const HOURS_IN_DAY = 24;

const WeekPage: React.FC<WeekPageProps> = ({ weekStart, events, onEventClick }) => {
  const days: Date[] = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const eventsByDay = (day: Date) =>
    events.filter(
      (ev) =>
        ev.startTime.getFullYear() === day.getFullYear() &&
        ev.startTime.getMonth() === day.getMonth() &&
        ev.startTime.getDate() === day.getDate()
    );

  return (
    <div className="flex border-t border-l border-gray-200 h-full">
      {/* Часова шкала */}
      <div className="w-12 border-r border-gray-200 flex flex-col">
        {Array.from({ length: HOURS_IN_DAY }).map((_, i) => (
          <div
            key={i}
            className="h-16 border-b border-gray-100 text-[10px] text-right pr-1"
          >
            {i}:00
          </div>
        ))}
      </div>

      {/* Колонки днів */}
      {days.map((day) => (
        <DayColumn
          key={day.toISOString()}
          date={day}
          events={eventsByDay(day)}
          onEventClick={onEventClick}
        />
      ))}
    </div>
  );
};

export default WeekPage;
