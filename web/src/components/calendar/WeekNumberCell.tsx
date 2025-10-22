import React from "react";

interface WeekNumberCellProps {
  weekNumber: number;
  onClick?: () => void;
}

const WeekNumberCell: React.FC<WeekNumberCellProps> = ({
  weekNumber,
  onClick,
}) => {
  return (
    <div
      className="
        border h-20 flex items-center justify-center font-semibold
        bg-gray-100 text-black cursor-pointer hover:bg-gray-200 transition
      "
      onClick={onClick}
    >
      {weekNumber}
    </div>
  );
};

export default WeekNumberCell;
