import React from "react";
import { CalendarEvent } from "../../models/Event";


interface EventBlockProps {
  event: CalendarEvent;
  onClick?: () => void;
}

const EventBlock: React.FC<EventBlockProps> = ({ event, onClick }) => {
  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();
  const duration = endMinutes - startMinutes;

  // Розрахунок позиції (по висоті, від 0 до 1440 хв = 24 години)
  const top = (startMinutes / 60) * 4; // 1 година = 4 * 16px = 64px
  const height = (duration / 60) * 64;

  return (
    <div
      className="absolute left-1 right-1 rounded-lg shadow-md p-2 text-xs cursor-pointer text-white"
      style={{
        top,
        height,
        backgroundColor: event.color || "#3b82f6", // дефолт синій
      }}
      onClick={onClick}
    >
      <strong>{event.title}</strong>
      <div>
        {start.getHours()}:{start.getMinutes().toString().padStart(2, "0")} –{" "}
        {end.getHours()}:{end.getMinutes().toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export default EventBlock;
