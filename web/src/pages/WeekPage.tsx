import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DayModule from "../components/calendar/DayModule";
import {
  calendars,
  events as allEvents,
  tasks as allTasks,
  type Calendar,
  type Event,
  type Task,
} from "../models/mockDB/calendar";

const DAYS_VISIBLE = 3; // рівно 3 дні на екран
const TOTAL_DAYS = 7;   // показуємо 7 днів (понеділок–неділя)

const WeekPage: React.FC = () => {
  const { calendarId, weekStart } = useParams<{ calendarId: string; weekStart: string }>();
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!calendarId) return <div>❌ Invalid URL parameters</div>;
  const calendar: Calendar | undefined = calendars.find(c => c.id === calendarId);
  if (!calendar) return <div>❌ Calendar not found</div>;

  const initialDate = weekStart ? new Date(weekStart) : new Date();

  // --- Генерація понеділка ---
  const dayOfWeek = initialDate.getDay(); // 0 = неділя
  const diffToMonday = (dayOfWeek + 6) % 7;
  const monday = new Date(initialDate);
  monday.setDate(initialDate.getDate() - diffToMonday);

  const days: Date[] = Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  const eventsByDay = (day: Date): Event[] =>
    allEvents.filter(ev => ev.calendarId === calendarId && ev.startDate.toDateString() === day.toDateString());

  const tasksByDay = (day: Date): Task[] =>
    allTasks.filter(t => t.calendarId === calendarId && new Date(t.dueDate).toDateString() === day.toDateString());

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="flex flex-col flex-1 px-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          {monday.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </h2>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto no-scrollbar gap-2"
          style={{ width: "100%", scrollSnapType: "x mandatory" }}
        >
          {days.map(day => {
            const items: (Event | Task)[] = [...eventsByDay(day), ...tasksByDay(day)];
            return (
              <div
                key={day.toDateString()}
                className="snap-center flex-shrink-0"
                style={{ width: `${100 / DAYS_VISIBLE}%` }}
              >
                <DayModule
  date={day}
  items={items}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onItemClick={_ => {
    const dateStr = day.toISOString().split("T")[0]; // yyyy-mm-dd
    const url = `http://localhost:5173/calendar/${calendarId}/day/${dateStr}`;
    window.location.href = url;
  }}
/>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WeekPage;
