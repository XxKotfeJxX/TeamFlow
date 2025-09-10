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
      className="absolute left-1 right-1 rounded-lg shadow-md p-1 text-xs cursor-pointer text-white"
      style={{
        top,
        height,
        backgroundColor: event.color || "#3b82f6",
        zIndex: hovered ? 10 : 1,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <strong>{event.title}</strong>
      <div className="text-[9px]">
        {start.getHours()}:{start.getMinutes().toString().padStart(2, "0")} –{" "}
        {end.getHours()}:{end.getMinutes().toString().padStart(2, "0")}
      </div>
      {hovered && event.description && (
        <div className="absolute bg-white text-black text-[10px] p-1 rounded shadow-md z-20 top-0 left-full ml-1 w-32">
          {event.description}
        </div>
      )}
      {/* Мікротаски */}
      {event.microTasks.length > 0 && (
        <div className="mt-1">
          {event.microTasks.map((mt) => (
            <div key={mt.id} className={`text-[8px] ${mt.done ? "line-through" : ""}`}>
              • {mt.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventBlock;
