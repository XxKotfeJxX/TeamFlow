import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { eventDb, calendarDb, type Calendar, type Event } from "../models/mockDB/calendar";
import DayModule from "../components/calendar/DayModule";

const WeekPage: React.FC = () => {
  const { calendarId, weekStart } = useParams<{ calendarId: string; weekStart: string }>();
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!calendarId || !weekStart) return <div>Invalid URL parameters</div>;

  const calendar: Calendar | undefined = calendarDb.getById(calendarId);
  if (!calendar) return <div>Calendar not found</div>;

  const weekStartDate = new Date(weekStart);

  // Генеруємо масив днів тижня
  const days: Date[] = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(weekStartDate);
    d.setDate(weekStartDate.getDate() + i);
    return d;
  });

  // Беремо всі події календаря
  const allEvents: Event[] = eventDb.getAll().filter(e => e.calendarId === calendarId);

  // Фільтр по дню
  const eventsByDay = (day: Date) =>
    allEvents.filter(
      (ev) =>
        ev.startDate.getFullYear() === day.getFullYear() &&
        ev.startDate.getMonth() === day.getMonth() &&
        ev.startDate.getDate() === day.getDate()
    );

  const scrollNext = () => {
  if (!carouselRef.current) return;
  const scrollAmount = carouselRef.current.clientWidth / 3;
  carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

  // Коли дійшли до кінця, переносимо перші елементи в кінець
  if (carouselRef.current.scrollLeft + scrollAmount >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
    const first = days.shift();
    if (first) days.push(first);
  }
};

 const scrollPrev = () => {
  if (!carouselRef.current) return;
  const scrollAmount = carouselRef.current.clientWidth / 3;
  carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });

  // Коли дійшли до початку, переносимо останні елементи в початок
  if (carouselRef.current.scrollLeft - scrollAmount <= 0) {
    const last = days.pop();
    if (last) days.unshift(last);
  }
};

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-col flex-1 px-4">
        {/* Кнопки прокрутки */}
        <div className="flex justify-between mb-2">
          <button onClick={scrollPrev} className="px-3 py-1 bg-gray-200 rounded">{"<"}</button>
          <button onClick={scrollNext} className="px-3 py-1 bg-gray-200 rounded">{">"}</button>
        </div>

        {/* Карусель днів */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 snap-x snap-mandatory"
        >
          {days.map(day => (
            <DayModule
              key={day.toISOString()}
              date={day}
              events={eventsByDay(day)}
              calendarId={calendarId}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WeekPage;
