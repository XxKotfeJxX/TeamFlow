import React, { useState } from "react";
import NavigationBar from "../components/calendar/NavigationBar";
import CalendarGrid from "../components/calendar/CalendarGrid";
import { CalendarEvent } from "../models/Event";

interface MonthPageProps {
  events: CalendarEvent[];
  onDayClick: (day: Date) => void;
  onWeekClick: (weekStart: Date) => void;
}

const MonthPage: React.FC<MonthPageProps> = ({ events, onDayClick, onWeekClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(d);
  };

  const nextMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(d);
  };

  const goToday = () => setCurrentDate(new Date());

  return (
    <div className="p-4 flex flex-col h-full">
      <NavigationBar
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onToday={goToday}
      />
      <div className="flex-1 overflow-auto">
        <CalendarGrid
          currentDate={currentDate}
          events={events}
          onDayClick={onDayClick}
          onWeekClick={onWeekClick}
        />
      </div>
    </div>
  );
};

export default MonthPage;
