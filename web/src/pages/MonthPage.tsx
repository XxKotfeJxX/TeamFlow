import React, { useState } from "react";
import NavigationBar from "../components/calendar/NavigationBar";
import CalendarGrid from "../components/calendar/CalendarGrid";
import { CalendarEvent } from "../models/Event";

interface MonthPageProps {
  events: CalendarEvent[];
  onDayClick: (day: Date) => void; // передаємо день для переходу на DayPage
  onWeekClick?: (weekStart: Date) => void; // для переходу на WeekPage
}

const MonthPage: React.FC<MonthPageProps> = ({ events, onDayClick }) => {
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
    <div className="p-4">
      <NavigationBar
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onToday={goToday}
      />
      <CalendarGrid
        currentDate={currentDate}
        events={events}
        onDayClick={onDayClick}
      />
    </div>
  );
};

export default MonthPage;
