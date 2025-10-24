// src/pages/WeekPage.tsx
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
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

const DAYS_VISIBLE = 3; // 3 дні на екран
const TOTAL_DAYS = 7; // показуємо тиждень

const WeekPage: React.FC = () => {
  const { calendarId, weekStart } = useParams<{
    calendarId: string;
    weekStart: string;
  }>();
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!calendarId) return <div>❌ Invalid URL parameters</div>;
  const calendar: Calendar | undefined = calendars.find(
    (c) => c.id === calendarId
  );
  if (!calendar) return <div>❌ Calendar not found</div>;

  const initialDate = weekStart ? new Date(weekStart) : new Date();

  // === Знаходимо понеділок ===
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
    allEvents.filter(
      (ev) =>
        ev.calendarId === calendarId &&
        ev.startDate.toDateString() === day.toDateString()
    );

  const tasksByDay = (day: Date): Task[] =>
    allTasks.filter(
      (t) =>
        t.calendarId === calendarId &&
        new Date(t.dueDate).toDateString() === day.toDateString()
    );

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50">
        {/* 🔹 Градієнтні бліки */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />
        </motion.div>

        <main className="relative z-10 flex flex-col flex-1 px-6 md:px-12 lg:px-24 py-24 text-gray-800">
          {/* Назва тижня */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900"
          >
            {monday.toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </motion.h2>

          {/* Карусель тижня */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            ref={carouselRef}
            className="flex overflow-x-auto no-scrollbar gap-3 pb-4 scroll-smooth"
            style={{ width: "100%", scrollSnapType: "x mandatory" }}
          >
            {days.map((day, index) => {
              const items: (Event | Task)[] = [
                ...eventsByDay(day),
                ...tasksByDay(day),
              ];
              const dateStr = day.toISOString().split("T")[0];

              return (
                <motion.div
                  key={day.toDateString()}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="snap-center flex-shrink-0"
                  style={{ width: `${100 / DAYS_VISIBLE}%` }}
                >
                  
                    <DayModule
                      date={day}
                      items={items}
                      onItemClick={() => {
                        window.location.href = `/calendar/${calendarId}/day/${dateStr}`;
                      }}
                    />
                  
                </motion.div>
              );
            })}
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default WeekPage;
