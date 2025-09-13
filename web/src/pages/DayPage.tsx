import React from "react";
import { useParams } from "react-router-dom";
import { calendars, events as allEvents, tasks as allTasks } from "../models/mockDB/calendar";
import type { Event, Task } from "../models/mockDB/calendar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventModal from "../components/calendar/EventModal";

const COLUMN_RANGES = [
  { start: 0, end: 7 },
  { start: 8, end: 15 },
  { start: 16, end: 23 },
];

const HOUR_HEIGHT = 128; // базова висота години
const TASK_HEIGHT = 64; // фіксована висота для тасків


const DayPage: React.FC = () => {
   const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const { calendarId, date } = useParams<{ calendarId: string; date: string }>();
  if (!calendarId) return <div>Календар не знайдено</div>;

  const currentDate = date ? new Date(date) : new Date();
  const calendar = calendars.find((c) => c.id === calendarId);
  if (!calendar) return <div>Календар не знайдено</div>;

  const todaysEvents: Event[] = allEvents
    .filter((e) => e.calendarId === calendarId)
    .filter((e) => e.startDate.toDateString() === currentDate.toDateString());

  const todaysTasks: Task[] = allTasks
    .filter((t) => t.calendarId === calendarId)
    .filter((t) => new Date(t.dueDate).toDateString() === currentDate.toDateString());

  const handleEventClick = (ev: Event) => setSelectedEvent(ev);
  const handleTaskClick = (task: Task) => alert(`Таск: ${task.title}`);
  const handleEmptySlotClick = (time: Date) =>
    alert(`Створити новий запис на ${time.toLocaleTimeString()}`);
  return (
    <div>
      <Header />
    <div className="flex border-t border-l border-gray-200 h-full p-4">
      {COLUMN_RANGES.map((range, colIndex) => (
        <div key={colIndex} className="flex-1 flex border-l border-gray-200 relative">
          {/* Часова шкала */}
          <div className="w-16 flex flex-col border-r border-gray-200">
            {Array.from({ length: range.end - range.start + 1 }).map((_, i) => {
              const hour = range.start + i;
              return (
                <div
                  key={hour}
                  className="h-32 border-b border-gray-100 text-[14px] text-right pr-2 text-gray-700"
                >
                  {hour}:00
                </div>
              );
            })}
          </div>

          {/* Місце для подій і тасків */}
          <div className="flex-1 relative">
            {/* Часові слоти */}
            {Array.from({ length: range.end - range.start + 1 }).map((_, i) => {
              const hour = range.start + i;
              return (
                <div
                  key={hour}
                  className="h-32 border-b border-gray-200"
                  onClick={() =>
                    handleEmptySlotClick(
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        currentDate.getDate(),
                        hour,
                        0,
                        0
                      )
                    )
                  }
                />
              );
            })}

            {/* Події */}
            {todaysEvents
              .filter((ev) => ev.startDate.getHours() >= range.start && ev.startDate.getHours() <= range.end)
              .map((ev) => {
                const top = ((ev.startDate.getHours() * 60 + ev.startDate.getMinutes()) / 60 - range.start) * HOUR_HEIGHT;
                const height = ((ev.endDate.getTime() - ev.startDate.getTime()) / (1000 * 60) / 60) * HOUR_HEIGHT;

                return (
                  <div
                    key={ev.id}
                    className="absolute left-1 right-1 rounded-lg p-1 text-xs cursor-pointer text-white border"
                    style={{
                      top,
                      height,
                      backgroundColor: ev.color + "80", // прозорість
                      borderColor: ev.color,
                    }}
                    onClick={() => handleEventClick(ev)}
                  >
                    <strong className="text-[18px]">{ev.title}</strong>
                    {ev.description && <div className="text-[16px]">{ev.description}</div>}
                    {ev.taskIds && ev.taskIds.length > 0 && (
                      <div className="mt-1 text-[12px]">
                        {ev.taskIds.map((id) => {
                          const t = allTasks.find((task) => task.id === id);
                          return t ? <div key={id}>• {t.title}</div> : null;
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

            {/* Таски */}
            {todaysTasks
              .filter((t) => t.type !== "event" && new Date(t.dueDate).getHours() >= range.start && new Date(t.dueDate).getHours() <= range.end)
              .map((t) => {
                const due = new Date(t.dueDate);
                const top = ((due.getHours() * 60 + due.getMinutes()) / 60 - range.start) * HOUR_HEIGHT - TASK_HEIGHT / 2;

                return (
                  <div
                    key={t.id}
                    className="absolute left-1 right-1 rounded-lg p-1 text-xs cursor-pointer border"
                    style={{
                      top,
                      height: TASK_HEIGHT,
                      backgroundColor: t.color ? t.color + "80" : "rgba(203, 213, 225, 0.5)",
                      borderColor: t.color || "rgb(203, 213, 225)",
                    }}
                    onClick={() => handleTaskClick(t)}
                  >
                    <strong className="text-[14px]">{t.title}</strong>
                    {t.description && <div className="text-[12px]">{t.description}</div>}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
      </div>
      <Footer />
      {selectedEvent && (
  <EventModal
    event={selectedEvent}
    onClose={() => setSelectedEvent(null)}
    isPersonalCalendar={calendar.ownerType === "user"}
  />
)}

      </div>
  );
};

export default DayPage;
