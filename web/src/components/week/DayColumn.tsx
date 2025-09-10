import React from "react";
import EventBlock from "./EventBlock";
import { CalendarEvent } from "../../models/Event"; // якщо у тебе вже є моделі

interface DayColumnProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const DayColumn: React.FC<DayColumnProps> = ({ events, onEventClick }) => {
  return (
    <div className="flex-1 border-l border-gray-200 relative">
      {/* Фон для часових слотів */}
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="h-16 border-b border-gray-100"></div>
      ))}

      {/* Події */}
      {events.map((ev) => (
        <EventBlock
          key={ev.id}
          event={ev}
          onClick={() => onEventClick?.(ev)}
        />
      ))}
    </div>
  );
};

export default DayColumn;
