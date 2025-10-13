// components/week/DayModule.tsx
import React, { useRef, useEffect } from "react";
import { type Event } from "../../models/mockDB/calendar";

interface DayModuleProps {
  date: Date;
  events: Event[];
  onEventClick?: (event: Event) => void;
  calendarId?: string;
}

const HOURS_IN_DAY = 24;

const DayModule: React.FC<DayModuleProps> = ({ date, events, onEventClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Прокрутка до 6:00 при mount
      const hourHeight = 64; // h-16 = 64px
      containerRef.current.scrollTop = hourHeight * 6;
    }
  }, []);

  const formatDate = (d: Date) =>
    d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });

  return (
    <div className="flex-shrink-0 w-[30%] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden my-8 mx-2 flex flex-col">
      {/* Шапка */}
      <div className="h-16 border-b border-gray-300 flex items-center justify-center font-medium bg-gray-100 text-gray-700 text-lg">
        {formatDate(date)}
      </div>

      {/* Контент з вертикальною прокруткою */}
      <div
        ref={containerRef}
        className="flex flex-col h-[600px] relative p-4 overflow-y-auto scrollbar-hide"
      >
        {/* Часова шкала */}
        {Array.from({ length: HOURS_IN_DAY }).map((_, i) => (
          <div
            key={i}
            className="h-16 border-b border-gray-100 text-[10px] text-right pr-1 select-none"
          >
            {i}:00
          </div>
        ))}

        {/* Події */}
        {events.map(ev => {
          const startHour = ev.startDate.getHours() + ev.startDate.getMinutes() / 60;
          const endHour = ev.endDate.getHours() + ev.endDate.getMinutes() / 60;
          const topPercent = (startHour / HOURS_IN_DAY) * 100;
          const heightPercent = ((endHour - startHour) / HOURS_IN_DAY) * 100;

          return (
            <div
              key={ev.id}
              className="absolute left-2 right-2 bg-blue-300 rounded-md p-1 text-xs cursor-pointer"
              style={{
                top: `${topPercent}%`,
                height: `${heightPercent}%`
              }}
              onClick={() => onEventClick?.(ev)}
            >
              {ev.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayModule;
