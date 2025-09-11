import React from "react";
import { CalendarEvent } from "../models/Event";
import EventBlock from "../components/week/EventBlock";

interface DayPageProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const HOURS_IN_DAY = 24;

const DayPage: React.FC<DayPageProps> = ({ events, onEventClick }) => {
  return (
    <div className="flex border-t border-l border-gray-200 h-full p-4">
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

      {/* Колонка дня */}
      <div className="flex-1 border-l border-gray-200 relative">
        {Array.from({ length: HOURS_IN_DAY }).map((_, i) => (
          <div key={i} className="h-16 border-b border-gray-100"></div>
        ))}

        {events.map((ev) => (
          <EventBlock key={ev.id} event={ev} onClick={() => onEventClick?.(ev)} />
        ))}
      </div>
    </div>
  );
};

export default DayPage;
