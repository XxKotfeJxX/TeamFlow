import React, { useState } from "react";
import { CalendarEvent } from "../../models/Event";

interface EventBlockProps {
  event: CalendarEvent;
  onClick?: () => void;
}

const EventBlock: React.FC<EventBlockProps> = ({ event, onClick }) => {
  const start = event.startTime;
  const end = event.endTime;

  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();
  const duration = endMinutes - startMinutes;

  const top = (startMinutes / 60) * 64; // 1 година = 64px
  const height = (duration / 60) * 64;

  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute left-1 right-1 rounded-lg border-2 shadow-md p-2 text-xs cursor-pointer"
      style={{
        top,
        height,
        borderColor: event.color || "#3b82f6",
        backgroundColor: `${event.color}80` || "#3b82f680", // 50% прозорість
        zIndex: hovered ? 10 : 1,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Назва + опис */}
      <div className="font-bold text-sm">{event.title}</div>
      {event.description && (
        <div className="text-[10px] text-gray-800">{event.description}</div>
      )}

      {/* Таски у події */}
      {event.microTasks.length > 0 && (
        <div className="mt-1 space-y-[1px]">
          {event.microTasks.map((mt) => (
            <div
              key={mt.id}
              className={`text-[9px] ${
                mt.done ? "line-through text-gray-500" : "text-black"
              }`}
            >
              • {mt.title}
            </div>
          ))}
        </div>
      )}

      {/* Назва команди */}
      <div className="absolute bottom-1 right-1 text-[9px] italic text-gray-700">
        {(event.eventMeta?.teamName as string) || "Команда"}
      </div>
    </div>
  );
};

export default EventBlock;
