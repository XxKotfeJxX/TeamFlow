import React from "react";
import { Task } from "../../models/Task";

interface TaskListProps {
  tasks: Task[];
  onToggleDone?: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleDone }) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-gray-50 border rounded-lg p-2"
        >
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggleDone?.(task.id)}
            />
            <span className={task.done ? "line-through text-gray-400" : ""}>
              {task.title}
            </span>
          </label>
          {task.deadline && (
            <span className="text-xs text-gray-500">
              {new Date(task.deadline).toLocaleDateString()}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
