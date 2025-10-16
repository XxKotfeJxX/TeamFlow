import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { calendars, taskDb, type Task } from "../models/mockDB/calendar";
import { teamDb, type Team } from "../models/mockDB/teams";
import { users, type User } from "../models/mockDB/users";

const TasksPage: React.FC = () => {
  const { ownerType, ownerId } = useParams<{ ownerType: "user" | "team"; ownerId: string }>();
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");

  // === Визначаємо власника ===
  const owner = useMemo(() => {
    if (ownerType === "team") return teamDb.getById(ownerId!);
    if (ownerType === "user") return users.find(u => u.id === ownerId!);
    return undefined;
  }, [ownerType, ownerId]);

  // === Знаходимо календар, що належить власнику ===
  const calendar = useMemo(() => {
    return calendars.find(c => c.ownerType === ownerType && c.ownerId === ownerId);
  }, [ownerType, ownerId]);

  // === Отримуємо завдання цього календаря ===
  const tasks = useMemo(() => {
    if (!calendar) return [];
    return taskDb.getByCalendarId(calendar.id);
  }, [calendar]);

  // === Фільтр по статусу ===
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
          <p className="text-gray-500 text-lg">Календар або власник не знайдені</p>
        </main>
        <Footer />
      </div>
    );
  }

  const ownerLabel =
    ownerType === "team"
      ? `команди ${(owner as Team).name}`
      : (owner as User).fullname || (owner as User).username;

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
          <button
            onClick={() => alert("TODO: створення нового завдання")}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            + Додати завдання
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 mb-4">
  {(["all", "active", "done"] as const).map((f) => (
    <button
      key={f}
      onClick={() => setFilter(f)}
      className={`px-3 py-1 rounded-lg text-sm font-medium ${
        filter === f
          ? "bg-blue-600 text-white"
          : "bg-gray-200 hover:bg-gray-300"
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
              className={`bg-white p-4 rounded-xl shadow-sm border flex items-start justify-between ${
                task.status === "completed" ? "opacity-70" : ""
              }`}
            >
              <div>
                <p className="font-semibold">{task.title}</p>
                {task.description && (
                  <p className="text-sm text-gray-500">{task.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {task.status === "completed" ? "✅ виконано" : "🕒 в роботі"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => taskDb.toggleStatus(task.id)}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  {task.status === "completed" ? "Відмінити" : "Готово"}
                </button>
                <button
                  onClick={() => taskDb.delete(task.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
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
    </div>
  );
};

export default TasksPage;
