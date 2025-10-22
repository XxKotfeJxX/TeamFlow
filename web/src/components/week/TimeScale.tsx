import React from "react";

interface TimeScaleProps {
  startHour?: number; // дефолт 0
  endHour?: number; // дефолт 24
  step?: number; // крок у годинах (наприклад 1 або 0.5)
}

const TimeScale: React.FC<TimeScaleProps> = ({
  startHour = 0,
  endHour = 24,
  step = 1,
}) => {
  const hours: string[] = [];
  for (let h = startHour; h < endHour; h += step) {
    const hour = Math.floor(h);
    const minutes = h % 1 === 0.5 ? "30" : "00";
    hours.push(`${hour.toString().padStart(2, "0")}:${minutes}`);
  }

  return (
    <div className="flex flex-col text-xs text-gray-600 w-12 pr-2 border-r border-gray-300">
      {hours.map((time) => (
        <div key={time} className="h-16 flex items-start">
          {time}
        </div>
      ))}
    </div>
  );
};

export default TimeScale;
