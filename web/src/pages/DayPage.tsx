import React from "react";
import { useParams } from "react-router-dom";
import { calendars, events as allEvents, tasks as allTasks } from "../models/mockDB/calendar";
import type { Event, Task } from "../models/mockDB/calendar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventModal from "../components/calendar/EventModal";
import TaskModal from "../components/calendar/TaskModal";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const COLUMN_RANGES = [
  { start: 0, end: 7 },
  { start: 8, end: 15 },
  { start: 16, end: 23 },
];

const HOUR_HEIGHT = 128;
const TASK_HEIGHT = 64;

const DayPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
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
  const handleTaskClick = (task: Task) => setSelectedTask(task);
  const handleEmptySlotClick = (time: Date) =>
    alert(`Створити новий запис на ${time.toLocaleTimeString()}`);

  // Пошук накладань у межах колонки (по пікселях)
  const findOverlaps = (items: (Event | Task)[], rangeStart: number) => {
    const clusters: { top: number; items: (Event | Task)[] }[] = [];

    items.forEach((item) => {
      const isEvent = "startDate" in item;
      const top = isEvent
        ? ((item.startDate.getHours() * 60 + item.startDate.getMinutes()) / 60 - rangeStart) * HOUR_HEIGHT
        : ((new Date(item.dueDate).getHours() * 60 + new Date(item.dueDate).getMinutes()) / 60 - rangeStart) * HOUR_HEIGHT - TASK_HEIGHT / 2;

      const height = isEvent
        ? ((item.endDate.getTime() - item.startDate.getTime()) / (1000 * 60) / 60) * HOUR_HEIGHT
        : TASK_HEIGHT;

      // шукаємо кластер, де вже є перетини
      const existingCluster = clusters.find((c) =>
        c.items.some((other) => {
          const isEventOther = "startDate" in other;
          const topOther = isEventOther
            ? ((other.startDate.getHours() * 60 + other.startDate.getMinutes()) / 60 - rangeStart) * HOUR_HEIGHT
            : ((new Date(other.dueDate).getHours() * 60 + new Date(other.dueDate).getMinutes()) / 60 - rangeStart) * HOUR_HEIGHT - TASK_HEIGHT / 2;

          const heightOther = isEventOther
            ? ((other.endDate.getTime() - other.startDate.getTime()) / (1000 * 60) / 60) * HOUR_HEIGHT
            : TASK_HEIGHT;

          return top < topOther + heightOther && top + height > topOther;
        })
      );

      if (existingCluster) {
        existingCluster.items.push(item);
        existingCluster.top = Math.min(
          existingCluster.top,
          top
        ); // тримаємо top найвищого елемента
      } else {
        clusters.push({ top, items: [item] });
      }
    });

    return clusters.filter((c) => c.items.length > 1);
  };

  // Вибір елемента з найвищим пріоритетом (менше число — вищий пріоритет)
  const getVisibleItems = (items: (Event | Task)[]) => {
    if (items.length <= 1) return items;
    const sorted = [...items].sort(
      (a, b) => (a.priority.personal ?? 0) - (b.priority.personal ?? 0)
    );
    return [sorted[0]];
  };

  return (
    <div>
      <Header />
      <div className="flex border-t border-l border-gray-200 h-full p-4">
        {COLUMN_RANGES.map((range, colIndex) => {
          const columnEvents = todaysEvents.filter(
            (ev) =>
              ev.startDate.getHours() >= range.start &&
              ev.startDate.getHours() <= range.end
          );
          const columnTasks = todaysTasks.filter(
            (t) =>
              t.type !== "event" &&
              new Date(t.dueDate).getHours() >= range.start &&
              new Date(t.dueDate).getHours() <= range.end
          );

          const allColumnItems = [...columnEvents, ...columnTasks];
          const visibleItems = getVisibleItems(allColumnItems);
          const overlaps = findOverlaps(allColumnItems, range.start);

          return (
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

              {/* Слоти та елементи */}
              <div className="flex-1 relative">
                {/* Порожні слоти */}
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

                {/* Відображення найпріоритетніших елементів */}
                {visibleItems.map((item) => {
                  const isEvent = "startDate" in item;
                  const top = isEvent
                    ? ((item.startDate.getHours() * 60 + item.startDate.getMinutes()) / 60 - range.start) * HOUR_HEIGHT
                    : ((new Date(item.dueDate).getHours() * 60 + new Date(item.dueDate).getMinutes()) / 60 - range.start) * HOUR_HEIGHT - TASK_HEIGHT / 2;

                  const height = isEvent
                    ? ((item.endDate.getTime() - item.startDate.getTime()) / (1000 * 60) / 60) * HOUR_HEIGHT
                    : TASK_HEIGHT;

                  return (
                    <div
                      key={item.id}
                      className="absolute left-1 right-1 rounded-lg p-1 cursor-pointer border overflow-hidden"
                      style={{
                        top,
                        height,
                        backgroundColor: item.color ? item.color + "80" : "rgba(203, 213, 225, 0.5)",
                        borderColor: item.color || "rgb(203, 213, 225)",
                        color: isEvent ? "white" : "black",
                      }}
                      onClick={() =>
                        isEvent ? handleEventClick(item as Event) : handleTaskClick(item as Task)
                      }
                    >
                      <div className="relative h-full">
                        <strong className="ml-4">{item.title}</strong>
                        {item.description && <div className="ml-4 mt-2">{item.description}</div>}
                      </div>
                    </div>
                  );
                })}

                {/* Іконки накладань */}
                {overlaps.map((o, idx) => (
                  <PlusCircleIcon
                    key={idx}
                    className="absolute w-6 h-6 text-blue-500 cursor-pointer"
                    style={{
                      top: o.top - 12,
                      right: 4,
                    }}
                    onClick={() => console.log("Overlapping items:", o.items)}
                    title="Є кілька елементів у цьому місці"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />

      {/* Модалки */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isPersonalCalendar={calendar.ownerType === "user"}
        />
      )}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default DayPage;
