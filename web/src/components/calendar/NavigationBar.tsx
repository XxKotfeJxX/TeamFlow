import React from "react";
import { useTranslation } from "../useTranslations";

interface NavigationBarProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  const { t } = useTranslation();
  const tm = t("monthPage");

  const monthNames = tm("months") as unknown as string[];

  return (
    <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
      <div className="flex gap-2">
        <button
          onClick={onPrevMonth}
          className="px-3 py-1 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition"
          title={tm("previousMonth")}
        >
          ◀
        </button>
        <button
          onClick={onNextMonth}
          className="px-3 py-1 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition"
          title={tm("nextMonth")}
        >
          ▶
        </button>
        <button
          onClick={onToday}
          className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {tm("today")}
        </button>
      </div>

      <h2 className="text-lg font-semibold text-black text-center w-full sm:w-auto">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
    </div>
  );
};

export default NavigationBar;
