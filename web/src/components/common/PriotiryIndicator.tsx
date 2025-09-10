import React from "react";

interface PriorityIndicatorProps {
  level: "low" | "medium" | "high";
}

const colors: Record<PriorityIndicatorProps["level"], string> = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({ level }) => {
  return (
    <span
      className={`inline-block w-3 h-3 rounded-full ${colors[level]}`}
      title={`Priority: ${level}`}
    />
  );
};

export default PriorityIndicator;
