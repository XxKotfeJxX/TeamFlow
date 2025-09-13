import React, { useState } from "react";
import type { Task } from "../../models/mockDB/calendar"; // беремо з твоєї псевдо-бд

interface TaskBlockProps {
  task: Task;
  onClick?: () => void;
}

const TaskBlock: React.FC<TaskBlockProps> = ({ task, onClick }) => {
  // Для таска використаємо dueDate як час
  const start = new Date(task.dueDate);
  const end = new Date(task.dueDate.getTime() + 60 * 60 * 1000); // умовно 1 год на таск

  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();
  const duration = endMinutes - startMinutes;

  const top = (startMinutes / 60) * 64;
  const height = (duration / 60) * 64;

  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute left-1 right-1 rounded-lg border-2 shadow-md p-2 text-xs cursor-pointer"
      style={{
        top,
        height,
        borderColor: task.type === "team" ? "#10b981" : "#3b82f6",
        backgroundColor:
          task.type === "team"
            ? "#10b98180" // зелений фон 50%
            : "#3b82f680", // синій фон 50%
        zIndex: hovered ? 10 : 1,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Назва + опис */}
      <div className="font-bold text-sm">{task.title}</div>
      {task.description && (
        <div className="text-[10px] text-gray-800">{task.description}</div>
      )}

      {/* Особистий чи командний */}
      <div className="absolute bottom-1 right-1 text-[9px] italic text-gray-700">
        {task.type === "personal"
          ? "Особистий"
          : (task.calendarId as string) || "Команда"}
      </div>
    </div>
  );
};

export default TaskBlock;
