// src/pages/DayPage.tsx  (або де в тебе файл)
import React from "react";
import { useParams } from "react-router-dom";
import { calendars, events as allEvents, tasks as allTasks } from "../models/mockDB/calendar";
import type { Event, Task } from "../models/mockDB/calendar";
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
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const { calendarId, date } = useParams<{ calendarId: string; date: string }>();

  // override: clusterId -> itemId (тимчасово, живе тільки у state)
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
  
  React.useEffect(() => {
    if (!overlapMenu) return;

    const startScrollY = window.scrollY;

    const handleScroll = () => {
      const scrolled = Math.abs(window.scrollY - startScrollY);
      if (scrolled > 80) {
        setOverlapMenu(null);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [overlapMenu]);

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
  const handleEmptySlotClick = (time: Date) => {
  if (!calendar) return;
  if (calendar.ownerType === "user") {
    // для особистого календаря створюємо одразу таск
    setCreateModalInfo({ type: "task", time });
  } else {
    // для командного календаря можна вибрати — спочатку показуємо вибір типу
    setCreateModalInfo({ type: null, time });
  }
};

  const computeDisplayTopAndHeight = (item: Event | Task, rangeStart: number) => {
  const isEvent = "startDate" in item;

  // реальна висота в пікселях
  const actualHeight = isEvent
    ? ((item.endDate.getTime() - item.startDate.getTime()) / (1000 * 60) / 60) * HOUR_HEIGHT
    : TASK_HEIGHT;

  let displayHeight = actualHeight;

  let top = computeTop(item, rangeStart);

  if (isEvent && actualHeight < TASK_HEIGHT) {
    displayHeight = TASK_HEIGHT;
    // зсуваємо по центру
    top = top - (TASK_HEIGHT - actualHeight) / 2;
  }

  return { top, height: displayHeight };
};

  
  // допоміжна: обчислення top для айтема (відносно колонки)
  const computeTop = (item: Event | Task, rangeStart: number) => {
    const isEvent = "startDate" in item;
    if (isEvent) {
      const minutes = item.startDate.getHours() * 60 + item.startDate.getMinutes();
      return ((minutes / 60 - rangeStart) * HOUR_HEIGHT);
    } else {
      const d = new Date(item.dueDate);
      const minutes = d.getHours() * 60 + d.getMinutes();
      return ((minutes / 60 - rangeStart) * HOUR_HEIGHT) - TASK_HEIGHT / 2;
    }
  };

  // Пошук накладань у межах колонки — повертаємо кластери з детерміністичним id
  const findOverlaps = (items: (Event | Task)[], rangeStart: number) => {
    const clusters: { top: number; items: (Event | Task)[] }[] = [];

    items.forEach((item) => {
      const top = computeTop(item, rangeStart);

      const height = "startDate" in item
        ? ((item.endDate.getTime() - item.startDate.getTime()) / (1000 * 60) / 60) * HOUR_HEIGHT
        : TASK_HEIGHT;

      const existingCluster = clusters.find((c) =>
        c.items.some((other) => {
          const topOther = computeTop(other, rangeStart);
          const heightOther = "startDate" in other
            ? ((other.endDate.getTime() - other.startDate.getTime()) / (1000 * 60) / 60) * HOUR_HEIGHT
            : TASK_HEIGHT;

          return top < topOther + heightOther && top + height > topOther;
        })
      );

      if (existingCluster) {
        existingCluster.items.push(item);
        existingCluster.top = Math.min(existingCluster.top, top);
      } else {
        clusters.push({ top, items: [item] });
      }
    });

    // Додаємо детерміністичний id, який залежить від ідентифікаторів елементів — щоб id був стабільним
    const clustersWithId = clusters
      .filter((c) => c.items.length > 1)
      .map((c) => {
        const sortedIds = c.items.map((i) => i.id).sort().join("_");
        return { id: `cluster-${rangeStart}-${sortedIds}`, top: c.top, items: c.items };
      });

    return clustersWithId;
  };

  // Повертає масив елементів, які мають бути відображені у колонці (включаючи overrides)
  const computeVisibleItemsForColumn = (
    allColumnItems: (Event | Task)[],
    overlapsForColumn: { id: string; top: number; items: (Event | Task)[] }[],
    rangeStart: number
  ) => {
    const result: (Event | Task)[] = [];

    // items, які не в жодному кластері — завжди показуємо
    const itemsInClusters = new Set(overlapsForColumn.flatMap((o) => o.items.map((i) => i.id)));
    const nonOverlapItems = allColumnItems.filter((i) => !itemsInClusters.has(i.id));
    result.push(...nonOverlapItems);

    // для кожного кластера — або override, або найвищий за priority.personal
    overlapsForColumn.forEach((cluster) => {
      const overrideId = activeEventOverrides[cluster.id];
      let chosen = overrideId ? cluster.items.find((i) => i.id === overrideId) : undefined;

      if (!chosen) {
        const sorted = [...cluster.items].sort(
          (a, b) => (a.priority.personal ?? 0) - (b.priority.personal ?? 0)
        );
        chosen = sorted[0];
      }

      if (chosen) result.push(chosen);
    });

    // Відсортуємо по top, щоб порядок рендеру був логічним
    result.sort((a, b) => computeTop(a, rangeStart) - computeTop(b, rangeStart));
    return result;
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

          const overlaps = findOverlaps(allColumnItems, range.start);

          // Отримуємо список айтемів, які треба відобразити у цій колонці
          const visibleItems = computeVisibleItemsForColumn(allColumnItems, overlaps, range.start);

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

                {/* Відображення visibleItems */}
                {visibleItems.map((item) => {
                  const isEvent = "startDate" in item;
                  const { top, height } = computeDisplayTopAndHeight(item, range.start);

                  // чи є в цього айтема конфлікти?
                  const hasConflicts = overlaps.some((o) => o.items.some((i) => i.id === item.id));

                  return (
                    <div
                      key={item.id}
                      className="absolute left-1 right-1 rounded-lg p-1 cursor-pointer border overflow-hidden"
                      style={{
                        top: `${top}px`, height: `${height}px`,
                        backgroundColor: item.color ? item.color + "80" : "rgba(203, 213, 225, 0.5)",
                        borderColor: item.color || "rgb(203, 213, 225)",
                        color: "white",
                      }}
                      onClick={() =>
                        isEvent ? handleEventClick(item as Event) : handleTaskClick(item as Task)
                      }
                    >
                      <div className="relative h-full">
                        <strong className="ml-4">{item.title}</strong>
                        {item.description && <div className="ml-4 mt-2">{item.description}</div>}
                      </div>

                      {/* Якщо цей айтем має конфлікти → показуємо плюсик */}
                      {hasConflicts && (
                        <FaPlusCircle
                          size={20}
                          className="absolute top-1 right-1 text-white bg-transparent cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();

                            const overlappingCluster = overlaps.find((o) => o.items.some((i) => i.id === item.id));
                            if (!overlappingCluster) return;

                            const target = e.currentTarget as unknown as HTMLElement;
                            const rect = target.getBoundingClientRect();

                            setOverlapMenu({
                              items: overlappingCluster.items,
                              position: { x: rect.right + 5, y: rect.top },
                              selectedItem: item,
                              groupId: overlappingCluster.id,
                            });
                          }}
                          title="Є кілька елементів у цьому місці"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Меню рендеримо один раз тут (поза map) */}
        {overlapMenu && (
          <OverlapMenu
            items={overlapMenu.items}
            position={overlapMenu.position}
            selectedItem={overlapMenu.selectedItem}
            onSelect={(item) => {
              // встановлюємо override для цього cluster, щоб цей айтем став видимим
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
      {/* Модалки створення таску/події */}
{createModalInfo && (
  <CreateItemModal
    calendarId={calendar.id}
    calendarType={calendar.ownerType} // "user" або "team"
    date={createModalInfo.time!}
    onClose={() => setCreateModalInfo(null)}
    onCreate={(newItem: Event | Task) => {
      if ("startDate" in newItem) {
        allEvents.push(newItem);
      } else {
        allTasks.push(newItem);
      }
      setCreateModalInfo(null);
    }}
  />
)}


{/* Модалки перегляду */}
{selectedEvent && (
  <EventModal
    event={selectedEvent}
    onClose={() => setSelectedEvent(null)}
    isPersonalCalendar={calendar.ownerType === "user"}
  />
)}
{selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />}

    </div>
  );
};

export default DayPage;
