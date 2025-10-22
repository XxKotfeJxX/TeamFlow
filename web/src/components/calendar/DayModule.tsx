import React, { useRef, useEffect } from "react";
import type { Event, Task } from "../../models/mockDB/calendar";

interface DayModuleProps {
  date: Date;
  items: (Event | Task)[];
  onItemClick: (item: Event | Task) => void;
}

const HOURS_IN_DAY = 24;
const HOUR_HEIGHT = 128;
const TASK_HEIGHT = 64;
const TIME_COLUMN_WIDTH = 64; // ширина колонки з часом
const hours = Array.from({ length: HOURS_IN_DAY }, (_, i) => i);

const DayModule: React.FC<DayModuleProps> = ({ date, items }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: HOUR_HEIGHT * 6,
      behavior: "smooth",
    });
  }, []);

  const formatDate = (d: Date) =>
    d.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  // Визначаємо top для елемента
  const computeTop = (item: Event | Task) => {
    const isEvent = "startDate" in item;
    const d = isEvent ? item.startDate : new Date(item.dueDate);
    const minutes = d.getHours() * 60 + d.getMinutes();
    return (minutes / 60) * HOUR_HEIGHT - (isEvent ? 0 : TASK_HEIGHT / 2);
  };

  // Визначаємо висоту та top з центруванням для коротких подій
  const computeDisplayTopAndHeight = (item: Event | Task) => {
    const isEvent = "startDate" in item;
    const actualHeight = isEvent
      ? ((item.endDate.getTime() - item.startDate.getTime()) /
          (1000 * 60 * 60)) *
        HOUR_HEIGHT
      : TASK_HEIGHT;

    let displayHeight = actualHeight;
    let top = computeTop(item);

    if (isEvent && actualHeight < TASK_HEIGHT) {
      displayHeight = TASK_HEIGHT;
      top = top - (TASK_HEIGHT - actualHeight) / 2;
    }

    return { top, height: displayHeight };
  };

  // Вирішуємо накладки по пріоритету
  const computeVisibleItems = (items: (Event | Task)[]) => {
    const clusters: { items: (Event | Task)[] }[] = [];

    items.forEach((item) => {
      const top = computeTop(item);
      const height =
        "startDate" in item
          ? ((item.endDate.getTime() - item.startDate.getTime()) /
              (1000 * 60 * 60)) *
            HOUR_HEIGHT
          : TASK_HEIGHT;

      const cluster = clusters.find((c) =>
        c.items.some((other) => {
          const otherTop = computeTop(other);
          const otherHeight =
            "startDate" in other
              ? ((other.endDate.getTime() - other.startDate.getTime()) /
                  (1000 * 60 * 60)) *
                HOUR_HEIGHT
              : TASK_HEIGHT;
          return top < otherTop + otherHeight && top + height > otherTop;
        })
      );

      if (cluster) cluster.items.push(item);
      else clusters.push({ items: [item] });
    });

    return clusters.map((c) => {
      if (c.items.length === 1) return c.items[0];
      return c.items.sort(
        (a, b) => (a.priority.personal ?? 0) - (b.priority.personal ?? 0)
      )[0];
    });
  };

  const visibleItems = computeVisibleItems(items);

  const navigateToDay = () => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    window.location.href = `http://localhost:5173/calendar/c3/day/${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="flex-shrink-0 w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden my-8 mx-2 flex flex-col">
      {/* Заголовок дня */}
      <div className="h-16 border-b border-gray-300 flex items-center justify-center font-medium bg-gray-100 text-gray-700 text-lg">
        {formatDate(date)}
      </div>

      {/* Контент — весь день клікабельний, скролиться */}
      <div
        ref={containerRef}
        className="relative h-[600px] overflow-y-auto"
        onClick={navigateToDay}
      >
        {/* Часова шкала */}
        <div className="relative z-10 pointer-events-none">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-[128px] border-b border-gray-200 text-[13px] text-gray-800 pl-3 flex items-start"
            >
              <span>{hour}:00</span>
            </div>
          ))}
        </div>

        {/* Події та таски */}
        <div className="absolute inset-0 z-20 px-4 pointer-events-auto">
          {visibleItems.map((item) => {
            const { top, height } = computeDisplayTopAndHeight(item);

            return (
              <div
                key={item.id}
                className="absolute rounded-lg overflow-hidden block"
                style={{
                  top: `${top}px`,
                  left: `${TIME_COLUMN_WIDTH}px`,
                  right: "1rem",
                  height: `${height}px`,
                  backgroundColor: item.color
                    ? item.color + "80"
                    : "rgba(203, 213, 225, 0.5)",
                  borderColor: item.color || "rgb(203, 213, 225)",
                  borderWidth: 1,
                  borderStyle: "solid",
                  color: "white",
                }}
              >
                <div className="relative h-full p-1">
                  <strong className="ml-2 truncate">{item.title}</strong>
                  {item.description && (
                    <div className="ml-2 mt-1 text-xs">{item.description}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayModule;
