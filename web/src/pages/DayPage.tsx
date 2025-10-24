import React from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";

const COLUMN_RANGES = [
  { start: 0, end: 7 },
  { start: 8, end: 15 },
  { start: 16, end: 23 },
] as const;

const HOUR_HEIGHT = 128;
const TASK_HEIGHT = 64;

// ===== Type Guards =====
function isEvent(item: Event | Task): item is Event {
  return (item as Event).startDate instanceof Date;
}

const rangeStartMs = (base: Date, startHour: number) =>
  new Date(
    base.getFullYear(),
    base.getMonth(),
    base.getDate(),
    startHour,
    0,
    0,
    0
  ).getTime();

const rangeEndMsExclusive = (base: Date, endHour: number) =>
  new Date(
    base.getFullYear(),
    base.getMonth(),
    base.getDate(),
    endHour + 1,
    0,
    0,
    0
  ).getTime();

function eventIntersectsRange(
  e: Event,
  day: Date,
  range: { start: number; end: number }
) {
  const rs = rangeStartMs(day, range.start);
  const re = rangeEndMsExclusive(day, range.end);
  return e.endDate.getTime() > rs && e.startDate.getTime() < re;
}

function getClippedEventBounds(
  e: Event,
  day: Date,
  range: { start: number; end: number }
): { start: Date; end: Date } {
  const rs = rangeStartMs(day, range.start);
  const re = rangeEndMsExclusive(day, range.end);
  const start = new Date(Math.max(e.startDate.getTime(), rs));
  const end = new Date(Math.min(e.endDate.getTime(), re));
  return { start, end };
}

function computeDisplayTopAndHeightForColumn(
  item: Event | Task,
  day: Date,
  range: { start: number; end: number }
) {
  if (isEvent(item)) {
    const { start, end } = getClippedEventBounds(item, day, range);
    const minutesFromRangeStart =
      start.getHours() * 60 + start.getMinutes() - range.start * 60;
    const durationMin = Math.max(
      0,
      (end.getTime() - start.getTime()) / (1000 * 60)
    );

    let top = (minutesFromRangeStart / 60) * HOUR_HEIGHT;
    let height = (durationMin / 60) * HOUR_HEIGHT;

    // Мінімальний розмір, щоб було видно короткі події
    if (height < TASK_HEIGHT) {
      const pad = (TASK_HEIGHT - height) / 2;
      top -= pad;
      height = TASK_HEIGHT;
    }
    return { top, height };
  }

  const due = new Date(item.dueDate);
  const minutesFromRangeStart =
    due.getHours() * 60 + due.getMinutes() - range.start * 60;
  const top = (minutesFromRangeStart / 60) * HOUR_HEIGHT - TASK_HEIGHT / 2;
  const height = TASK_HEIGHT;
  return { top, height };
}

// top для сортування в колонці
function computeTopForColumn(
  item: Event | Task,
  day: Date,
  range: { start: number; end: number }
) {
  if (isEvent(item)) {
    const { start } = getClippedEventBounds(item, day, range);
    const minutesFromRangeStart =
      start.getHours() * 60 + start.getMinutes() - range.start * 60;
    return (minutesFromRangeStart / 60) * HOUR_HEIGHT;
  }
  const due = new Date(item.dueDate);
  const minutesFromRangeStart =
    due.getHours() * 60 + due.getMinutes() - range.start * 60;
  return (minutesFromRangeStart / 60) * HOUR_HEIGHT - TASK_HEIGHT / 2;
}

type OverlapCluster = { id: string; top: number; items: (Event | Task)[] };

function findOverlapsForColumn(
  items: (Event | Task)[],
  day: Date,
  range: { start: number; end: number }
): OverlapCluster[] {
  const clusters: { top: number; items: (Event | Task)[] }[] = [];

  items.forEach((item) => {
    const { top, height } = computeDisplayTopAndHeightForColumn(
      item,
      day,
      range
    );

    const cluster = clusters.find((c) =>
      c.items.some((o) => {
        const other = computeDisplayTopAndHeightForColumn(o, day, range);
        return top < other.top + other.height && top + height > other.top;
      })
    );

    if (cluster) {
      cluster.items.push(item);
      cluster.top = Math.min(cluster.top, top);
    } else {
      clusters.push({ top, items: [item] });
    }
  });

  const dayKey = day.toDateString();
  return clusters
    .filter((c) => c.items.length > 1)
    .map((c) => ({
      id: `cluster-${c.items
        .map((i) => i.id)
        .sort()
        .join("_")}-${dayKey}`, // глобальний для дня
      top: c.top,
      items: c.items,
    }));
}

// ===== Вибір айтемів для показу в колонці =====
function computeVisibleItemsForColumn(
  allColumnItems: (Event | Task)[],
  overlaps: OverlapCluster[],
  range: { start: number; end: number },
  day: Date,
  globallySelectedEventId: string | null
) {
  if (globallySelectedEventId) {
    const onlySelected = allColumnItems.filter(
      (i) => i.id === globallySelectedEventId
    );
    return onlySelected.sort(
      (a, b) =>
        computeTopForColumn(a, day, range) - computeTopForColumn(b, day, range)
    );
  }

  const result: (Event | Task)[] = [];
  const clusteredIds = new Set(
    overlaps.flatMap((o) => o.items.map((i) => i.id))
  );
  const nonOverlap = allColumnItems.filter((i) => !clusteredIds.has(i.id));
  result.push(...nonOverlap);

  overlaps.forEach((cluster) => {
    const chosen =
      [...cluster.items].sort(
        (a, b) =>
          (isEvent(a) ? a.priority.personal : a.priority.personal) -
          (isEvent(b) ? b.priority.personal : b.priority.personal)
      )[0] ?? null;

    if (chosen) result.push(chosen);
  });

  return result.sort(
    (a, b) =>
      computeTopForColumn(a, day, range) - computeTopForColumn(b, day, range)
  );
}

const DayPage: React.FC = () => {
  const { calendarId, date } = useParams<{
    calendarId: string;
    date: string;
  }>();

  const [events, setEvents] = React.useState<Event[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

  const [visibleEventId, setVisibleEventId] = React.useState<string | null>(
    null
  );

  const navigate = useNavigate();

  const goToPreviousDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    navigate(`/calendar/${calendarId}/day/${prev.toISOString().split("T")[0]}`);
  };

  const goToNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    navigate(`/calendar/${calendarId}/day/${next.toISOString().split("T")[0]}`);
  };

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

  React.useEffect(() => {
    if (!calendarId) return;
    setEvents(eventDb.getByCalendarId(calendarId));
    setTasks(taskDb.getByCalendarId(calendarId));
  }, [calendarId]);

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

  const todaysEvents = events.filter(
    (e) =>
      e.startDate.toDateString() === currentDate.toDateString() ||
      e.endDate.toDateString() === currentDate.toDateString()
  );
  const todaysTasks = tasks.filter(
    (t) => new Date(t.dueDate).toDateString() === currentDate.toDateString()
  );

  const handleEventClick = (ev: Event) => setSelectedEvent(ev);
  const handleTaskClick = (task: Task) => setSelectedTask(task);
  const handleEmptySlotClick = (time: Date) =>
    setCreateModalInfo({ type: null, time });

  return (
    <>
      <Header />

      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50">
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        </motion.div>

        <main className="relative z-10 max-w-7xl mx-auto px-4 py-24">
          <div className="text-center relative flex flex-col items-center sm:block mb-10">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
              {currentDate.toLocaleDateString("uk-UA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>

            <div className="flex justify-center gap-4 sm:block">
              <Button
                onClick={goToPreviousDay}
                className="
                px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl
                shadow-sm hover:shadow-md transition
                sm:absolute sm:left-8
              "
              >
                ← Попередній день
              </Button>

              <Button
                onClick={goToNextDay}
                className="
                px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl
                shadow-sm hover:shadow-md transition
                sm:absolute sm:right-8
              "
              >
                Наступний день →
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row border-t border-l border-gray-200 rounded-3xl bg-white/70 backdrop-blur-md shadow-lg my-12 relative overflow-hidden">
            {COLUMN_RANGES.map((range, colIndex) => {
              const columnEvents = todaysEvents.filter((e) =>
                eventIntersectsRange(e, currentDate, range)
              );
              const columnTasks = todaysTasks.filter((t) => {
                const h = new Date(t.dueDate).getHours();
                return h >= range.start && h <= range.end;
              });

              const allColumnItems: (Event | Task)[] = [
                ...columnEvents,
                ...columnTasks,
              ];
              const overlaps = findOverlapsForColumn(
                allColumnItems,
                currentDate,
                range
              );

              const visibleItems = computeVisibleItemsForColumn(
                allColumnItems,
                overlaps,
                range,
                currentDate,
                visibleEventId
              );

              return (
                <div
                  key={colIndex}
                  className="flex-1 flex border-l border-gray-200 relative"
                >
                  <div className="w-16 flex flex-col border-r border-gray-200 bg-gray-50/40">
                    {Array.from({ length: range.end - range.start + 1 }).map(
                      (_, i) => {
                        const hour = range.start + i;
                        return (
                          <div
                            key={hour}
                            className="h-32 border-b border-gray-100 text-[14px] text-right pr-2 text-gray-600"
                          >
                            {hour}:00
                          </div>
                        );
                      }
                    )}
                  </div>

                  <div className="flex-1 relative">
                    {Array.from({ length: range.end - range.start + 1 }).map(
                      (_, i) => {
                        const hour = range.start + i;
                        return (
                          <div
                            key={hour}
                            className="h-32 border-b border-gray-200 cursor-pointer hover:bg-blue-50/40 transition"
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
                      }
                    )}

                    {visibleItems.map((item) => {
                      const { top, height } =
                        computeDisplayTopAndHeightForColumn(
                          item,
                          currentDate,
                          range
                        );

                      const hasConflicts = overlaps.some((o) =>
                        o.items.some((i) => i.id === item.id)
                      );

                      const color = item.color ?? "";
                      const description = item.description ?? "";

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1 right-1 rounded-xl p-2 cursor-pointer border overflow-hidden shadow-sm hover:shadow-md transition"
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            backgroundColor: color
                              ? `${color}90`
                              : "rgba(203,213,225,0.6)",
                            borderColor: color || "rgb(203,213,225)",
                          }}
                          onClick={() =>
                            isEvent(item)
                              ? handleEventClick(item)
                              : handleTaskClick(item)
                          }
                        >
                          <div className="relative h-full text-white">
                            <strong className="ml-1">{item.title}</strong>
                            {description && (
                              <div className="ml-1 mt-1 text-sm opacity-90">
                                {description}
                              </div>
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
                                const rect = (
                                  e.currentTarget as unknown as HTMLElement
                                ).getBoundingClientRect();
                                setOverlapMenu({
                                  items: cluster.items,
                                  position: { x: rect.right + 5, y: rect.top },
                                  selectedItem: item,
                                  groupId: cluster.id,
                                });
                              }}
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {overlapMenu && (
              <OverlapMenu
                items={overlapMenu.items}
                position={overlapMenu.position}
                selectedItem={overlapMenu.selectedItem}
                onSelect={(item) => {
                  setVisibleEventId(item.id);
                  setOverlapMenu(null);
                }}
                onClose={() => {
                  setOverlapMenu(null);
                  setVisibleEventId(null);
                }}
              />
            )}
          </div>
        </main>

        <Footer />

        {createModalInfo && (
          <CreateItemModal
            calendarId={calendar.id}
            calendarType={calendar.ownerType}
            date={createModalInfo.time!}
            onClose={() => setCreateModalInfo(null)}
            onCreate={(newItem: Event | Task) => {
              if (isEvent(newItem)) {
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
            }}
          />
        )}
      </div>
    </>
  );
};

export default DayPage;
