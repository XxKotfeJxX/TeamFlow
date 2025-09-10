import React from "react";

interface EventTooltipProps {
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  onClose?: () => void;
}

const EventTooltip: React.FC<EventTooltipProps> = ({
  title,
  startTime,
  endTime,
  description,
  onClose,
}) => {
  return (
    <div className="absolute bg-white shadow-lg rounded-xl p-3 border border-gray-200 z-50">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        )}
      </div>
      <p className="text-sm text-gray-600">
        {startTime} – {endTime}
      </p>
      {description && (
        <p className="mt-2 text-sm text-gray-700">{description}</p>
      )}
    </div>
  );
};

export default EventTooltip;
