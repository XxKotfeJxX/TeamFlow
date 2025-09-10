import React from "react";

interface WeekNumberCellProps {
  weekNumber: number;
}

const WeekNumberCell: React.FC<WeekNumberCellProps> = ({ weekNumber }) => {
  return (
    <div className="border h-20 flex items-center justify-center font-semibold bg-gray-100">
      {weekNumber}
    </div>
  );
};

export default WeekNumberCell;
