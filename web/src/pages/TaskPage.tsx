import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { calendars, taskDb, type Task } from "../models/mockDB/calendar";
import { teamDb, type Team } from "../models/mockDB/teams";
import { users, type User } from "../models/mockDB/users";

const TasksPage: React.FC = () => {
  const { ownerType, ownerId } = useParams<{
    ownerType: "user" | "team";
    ownerId: string;
  }>();
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [tasksState, setTasksState] = useState<Task[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null); // 🔹 модалка

  // === Визначаємо власника ===
  const owner = useMemo(() => {
    if (ownerType === "team") return teamDb.getById(ownerId!);
    if (ownerType === "user") return users.find((u) => u.id === ownerId!);
    return undefined;
  }, [ownerType, ownerId]);

  // === Знаходимо календар ===
  const calendar = useMemo(() => {
    return calendars.find(
      (c) => c.ownerType === ownerType && c.ownerId === ownerId
    );
  }, [ownerType, ownerId]);

  // === Отримуємо завдання календаря ===
  const tasks = useMemo(() => {
    if (!calendar) return [];
    console.log("🧾 calendar.id =", calendar?.id);
    console.log("🧾 all tasks =", taskDb.getAll());
    return taskDb.getByCalendarId(calendar.id);
  }, [calendar, tasksState]);

  // === Фільтр ===
  const filtered: Task[] = useMemo(() => {
    return tasks.filter((t: Task) => {
      if (filter === "all") return true;
      if (filter === "done") return t.status === "completed";
      return t.status !== "completed";
    });
  }, [tasks, filter]);

  // === Якщо не знайшли власника або календар ===
  if (!owner || !calendar) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Календар або власник не знайдені
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const ownerLabel =
    ownerType === "team"
      ? `команди ${(owner as Team).name}`
      : (owner as User).fullname || (owner as User).username;

  // === Обробники ===
  const handleToggleStatus = (taskId: string) => {
    taskDb.toggleStatus(taskId);
    setTasksState([...taskDb.getAll()]);
  };

  const confirmDelete = (task: Task) => {
    setDeleteTarget(task);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    taskDb.delete(deleteTarget.id);
    setTasksState([...taskDb.getAll()]);
    setDeleteTarget(null);
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  // === Основний контент ===
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-8 pt-[var(--header-height,4rem)]">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Завдання для {ownerLabel}
          </h1>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 mb-4">
          {(["all", "active", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-800"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300 hover:border-gray-400"
              }`}
            >
              {f === "all" ? "Усі" : f === "done" ? "Виконані" : "Активні"}
            </button>
          ))}
        </div>

        {/* TASK LIST */}
        <div className="grid gap-4">
          {filtered.map((task: Task) => (
            <div
              key={task.id}
              className={`bg-white p-4 rounded-xl shadow-sm border flex items-start justify-between transition-all ${
                task.status === "completed"
                  ? "opacity-70 border-green-300"
                  : "hover:shadow-md"
              }`}
            >
              <div>
                <p
                  className={`font-semibold text-base ${
                    task.status === "completed"
                      ? "text-gray-600 line-through"
                      : "text-black"
                  }`}
                >
                  {task.title}
                </p>
                {task.description && (
                  <p className="text-sm text-gray-500">{task.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {task.status === "completed" ? "✅ виконано" : "🕒 в роботі"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(task.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    task.status === "completed"
                      ? "bg-yellow-100 text-yellow-700 hover:border-yellow-300 hover:bg-yellow-200"
                      : "bg-green-100 text-green-700 hover:border-green-300 hover:bg-green-200"
                  }`}
                >
                  {task.status === "completed" ? "Відмінити" : "Готово"}
                </button>

                <button
                  onClick={() => confirmDelete(task)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors hover:border-red-300"
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-gray-400 text-center mt-10">
              Немає завдань у цій категорії
            </p>
          )}
        </div>
      </main>

      <Footer />

      {/* ===== MODAL ===== */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-sm text-center animate-fadeIn">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Видалити завдання?
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              "{deleteTarget.title}" буде видалено без можливості відновлення.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition hover:border-gray-400"
              >
                Скасувати
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition hover:border-red-800"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
