import React from "react";

interface NavigationBarProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentDate, onPrevMonth, onNextMonth, onToday }) => {
  const monthNames = [
    "Січень","Лютий","Березень","Квітень","Травень","Червень",
    "Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"
  ];

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2">
        <button onClick={onPrevMonth} className="px-3 py-1 rounded-lg bg-gray-200">◀</button>
        <button onClick={onNextMonth} className="px-3 py-1 rounded-lg bg-gray-200">▶</button>
        <button onClick={onToday} className="px-3 py-1 rounded-lg bg-blue-600 text-white">Сьогодні</button>
      </div>
      <h2 className="text-lg font-semibold">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
    </div>
  );
};

export default NavigationBar;
