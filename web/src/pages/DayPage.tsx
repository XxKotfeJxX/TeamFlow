// src/pages/DayPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import {
  calendars,
  eventDb,
  taskDb,
  type Event,
  type Task,
} from "../models/mockDB/calendar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventModal from "../components/calendar/EventModal";
import TaskModal from "../components/calendar/TaskModal";
import { FaPlusCircle } from "react-icons/fa";
import OverlapMenu from "../components/calendar/OverlapMenu";
import CreateItemModal from "../components/calendar/CreateItemModal";

const COLUMN_RANGES = [
  { start: 0, end: 7 },
  { start: 8, end: 15 },
  { start: 16, end: 23 },
];

const HOUR_HEIGHT = 128;
const TASK_HEIGHT = 64;

const DayPage: React.FC = () => {
  const { calendarId, date } = useParams<{ calendarId: string; date: string }>();

  const [events, setEvents] = React.useState<Event[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

  const [activeEventOverrides, setActiveEventOverrides] = React.useState<Record<string, string>>({});
  const [overlapMenu, setOverlapMenu] = React.useState<{
    items: (Event | Task)[];
    position: { x: number; y: number };
    selectedItem?: Event | Task;
    groupId?: string;
  } | null>(null);

  const [createModalInfo, setCreateModalInfo] = React.useState<{
    type: "task" | "event" | null;
    time: Date | null;
  } | null>(null);

  const currentDate = date ? new Date(date) : new Date();

  // 🔹 1. Підвантажуємо події/таски з localStorage через БД
  React.useEffect(() => {
    if (!calendarId) return;
    setEvents(eventDb.getByCalendarId(calendarId));
    setTasks(taskDb.getByCalendarId(calendarId));
  }, [calendarId]);

  // 🔹 2. Закриваємо меню при скролі
  React.useEffect(() => {
    if (!overlapMenu) return;
    const startScrollY = window.scrollY;
    const handleScroll = () => {
      if (Math.abs(window.scrollY - startScrollY) > 80) setOverlapMenu(null);
    };
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [overlapMenu]);

  if (!calendarId) return <div>Календар не знайдено</div>;
  const calendar = calendars.find((c) => c.id === calendarId);
  if (!calendar) return <div>Календар не знайдено</div>;

  // 🔹 3. Вибір елементів на поточну дату
  const todaysEvents = events.filter(
    (e) => e.startDate.toDateString() === currentDate.toDateString()
  );
  const todaysTasks = tasks.filter(
    (t) => new Date(t.dueDate).toDateString() === currentDate.toDateString()
  );

  const handleEventClick = (ev: Event) => setSelectedEvent(ev);
  const handleTaskClick = (task: Task) => setSelectedTask(task);

  // 🔹 4. Клік по порожньому місцю
  const handleEmptySlotClick = (time: Date) => {
    if (calendar.ownerType === "user") {
      setCreateModalInfo({ type: "task", time });
    } else {
      setCreateModalInfo({ type: null, time });
    }
  };

  // 🔹 5. Вираховуємо позицію/висоту айтемів
  const computeTop = (item: Event | Task, rangeStart: number) => {
    const isEvent = "startDate" in item;
    const dateObj = isEvent ? item.startDate : new Date(item.dueDate);
    const minutes = dateObj.getHours() * 60 + dateObj.getMinutes();
    return ((minutes / 60 - rangeStart) * HOUR_HEIGHT) - (isEvent ? 0 : TASK_HEIGHT / 2);
  };

  const computeDisplayTopAndHeight = (item: Event | Task, rangeStart: number) => {
    const isEvent = "startDate" in item;
    const actualHeight = isEvent
      ? ((item.endDate.getTime() - item.startDate.getTime()) / (1000 * 60 * 60)) * HOUR_HEIGHT
      : TASK_HEIGHT;

    let height = actualHeight;
    let top = computeTop(item, rangeStart);

    if (isEvent && actualHeight < TASK_HEIGHT) {
      height = TASK_HEIGHT;
      top -= (TASK_HEIGHT - actualHeight) / 2;
    }
    return { top, height };
  };

  // 🔹 6. Визначення накладань
  const findOverlaps = (items: (Event | Task)[], rangeStart: number) => {
    const clusters: { top: number; items: (Event | Task)[] }[] = [];
    items.forEach((item) => {
      const top = computeTop(item, rangeStart);
      const height = "startDate" in item
        ? ((item.endDate.getTime() - item.startDate.getTime()) / (1000 * 60 * 60)) * HOUR_HEIGHT
        : TASK_HEIGHT;

      const cluster = clusters.find((c) =>
        c.items.some((o) => {
          const t2 = computeTop(o, rangeStart);
          const h2 = "startDate" in o
            ? ((o.endDate.getTime() - o.startDate.getTime()) / (1000 * 60 * 60)) * HOUR_HEIGHT
            : TASK_HEIGHT;
          return top < t2 + h2 && top + height > t2;
        })
      );
      if (cluster) {
        cluster.items.push(item);
        cluster.top = Math.min(cluster.top, top);
      } else clusters.push({ top, items: [item] });
    });

    return clusters
      .filter((c) => c.items.length > 1)
      .map((c) => ({
        id: `cluster-${rangeStart}-${c.items.map((i) => i.id).sort().join("_")}`,
        top: c.top,
        items: c.items,
      }));
  };

  // 🔹 7. Вибір айтемів для рендера
  const computeVisibleItemsForColumn = (
    allColumnItems: (Event | Task)[],
    overlaps: { id: string; top: number; items: (Event | Task)[] }[],
    rangeStart: number
  ) => {
    const result: (Event | Task)[] = [];
    const clustered = new Set(overlaps.flatMap((o) => o.items.map((i) => i.id)));
    const nonOverlap = allColumnItems.filter((i) => !clustered.has(i.id));
    result.push(...nonOverlap);

    overlaps.forEach((cluster) => {
      const overrideId = activeEventOverrides[cluster.id];
      const chosen = overrideId
        ? cluster.items.find((i) => i.id === overrideId)
        : [...cluster.items].sort(
            (a, b) => (a.priority.personal ?? 0) - (b.priority.personal ?? 0)
          )[0];
      if (chosen) result.push(chosen);
    });

    result.sort((a, b) => computeTop(a, rangeStart) - computeTop(b, rangeStart));
    return result;
  };

  // ===========================================================
  // 🧩 Рендер сторінки
  // ===========================================================
  return (
    <div>
      <Header />

      <div className="flex border-t border-l border-gray-200 h-full p-4 pt-[var(--header-height,4rem)]">
        {COLUMN_RANGES.map((range, colIndex) => {
          const columnEvents = todaysEvents.filter(
            (e) => e.startDate.getHours() >= range.start && e.startDate.getHours() <= range.end
          );
          const columnTasks = todaysTasks.filter(
            (t) =>
              new Date(t.dueDate).getHours() >= range.start &&
              new Date(t.dueDate).getHours() <= range.end
          );

          const allColumnItems = [...columnEvents, ...columnTasks];
          const overlaps = findOverlaps(allColumnItems, range.start);
          const visibleItems = computeVisibleItemsForColumn(allColumnItems, overlaps, range.start);

          return (
            <div key={colIndex} className="flex-1 flex border-l border-gray-200 relative">
              {/* Ліва шкала */}
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

              {/* Основна зона */}
              <div className="flex-1 relative">
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
                            hour
                          )
                        )
                      }
                    />
                  );
                })}

                {/* айтеми */}
                {visibleItems.map((item) => {
                  const isEvent = "startDate" in item;
                  const { top, height } = computeDisplayTopAndHeight(item, range.start);
                  const hasConflicts = overlaps.some((o) => o.items.some((i) => i.id === item.id));

                  return (
                    <div
                      key={item.id}
                      className="absolute left-1 right-1 rounded-lg p-1 cursor-pointer border overflow-hidden"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        backgroundColor: item.color ? item.color + "80" : "rgba(203,213,225,0.5)",
                        borderColor: item.color || "rgb(203,213,225)",
                        color: "white",
                      }}
                      onClick={() =>
                        isEvent ? handleEventClick(item as Event) : handleTaskClick(item as Task)
                      }
                    >
                      <div className="relative h-full">
                        <strong className="ml-4">{item.title}</strong>
                        {item.description && (
                          <div className="ml-4 mt-2">{item.description}</div>
                        )}
                      </div>

                      {hasConflicts && (
                        <FaPlusCircle
                          size={20}
                          className="absolute top-1 right-1 text-white cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            const cluster = overlaps.find((o) =>
                              o.items.some((i) => i.id === item.id)
                            );
                            if (!cluster) return;
                            const rect = (e.currentTarget as unknown as HTMLElement).getBoundingClientRect();
                            setOverlapMenu({
                              items: cluster.items,
                              position: { x: rect.right + 5, y: rect.top },
                              selectedItem: item,
                              groupId: cluster.id,
                            });
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Меню перекриття */}
        {overlapMenu && (
          <OverlapMenu
            items={overlapMenu.items}
            position={overlapMenu.position}
            selectedItem={overlapMenu.selectedItem}
            onSelect={(item) => {
              if (overlapMenu.groupId) {
                setActiveEventOverrides((prev) => ({
                  ...prev,
                  [overlapMenu.groupId!]: item.id,
                }));
              }
              setOverlapMenu(null);
            }}
            onClose={() => setOverlapMenu(null)}
          />
        )}
      </div>

      <Footer />

      {/* 🔹 модалки створення */}
      {createModalInfo && (
        <CreateItemModal
          calendarId={calendar.id}
          calendarType={calendar.ownerType}
          date={createModalInfo.time!}
          onClose={() => setCreateModalInfo(null)}
          onCreate={(newItem: Event | Task) => {
            if ("startDate" in newItem) {
              const created = eventDb.create(newItem);
              setEvents((prev) => [...prev, created]);
            } else {
              const created = taskDb.create(newItem);
              setTasks((prev) => [...prev, created]);
            }
            setCreateModalInfo(null);
          }}
        />
      )}

      {/* 🔹 модалки редагування */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isPersonalCalendar={calendar.ownerType === "user"}
          onSave={(updated: Event) => {
            eventDb.update(updated.id, updated);
            setEvents((prev) =>
              prev.map((e) => (e.id === updated.id ? updated : e))
            );
            setSelectedEvent(null);
          }}
        />
      )}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={(updated: Task) => {
            taskDb.update(updated.id, updated);
            setTasks((prev) =>
              prev.map((t) => (t.id === updated.id ? updated : t))
            );
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default DayPage;
