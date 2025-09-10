import React from "react";
import { CalendarEvent } from "../../models/Event";

interface CalendarDayCellProps {
  day: Date;
  events: CalendarEvent[];
  isToday: boolean;
  onClick: () => void;
}

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({ day, events, isToday, onClick }) => {
  return (
    <div
      className={`border h-20 p-1 flex flex-col cursor-pointer ${
        isToday ? "bg-blue-100" : "bg-white"
      }`}
      onClick={onClick}
    >
      <div className="text-sm font-semibold">{day.getDate()}</div>
      <div className="flex flex-wrap gap-1 mt-1 overflow-hidden">
        {events.slice(0, 2).map((ev) => (
          <span
            key={ev.id}
            className="text-xs rounded px-1"
            style={{ backgroundColor: ev.color || "#3b82f6", color: "white" }}
          >
            {ev.title}
          </span>
        ))}
        {events.length > 2 && (
          <span className="text-xs text-gray-500">+{events.length - 2}</span>
        )}
      </div>
    </div>
  );
};

export default CalendarDayCell;
