import React, { useMemo, useState } from "react";
import { eventDb, taskDb } from "../../models/mockDB/calendar";
import type { User } from "../../models/mockDB/users";

interface TeamStatsProps {
  teamId: string;
  teamMembers: User[];
}

type Period = "week" | "month" | "all";

const TeamStats: React.FC<TeamStatsProps> = ({ teamId, teamMembers }) => {
  const [period, setPeriod] = useState<Period>("week");

  const now = new Date();
  const startDate = useMemo(() => {
    const d = new Date(now);
    if (period === "week") d.setDate(now.getDate() - 7);
    else if (period === "month") d.setMonth(now.getMonth() - 1);
    else d.setFullYear(1970);
    return d;
  }, [period]);

  // === 1️⃣ Отримуємо задачі та події ===
  const teamTasks = useMemo(
    () => taskDb.getAll().filter((t) => t.type === "team" && t.calendarId === teamId),
    [teamId]
  );

  const filteredTasks = useMemo(
    () => teamTasks.filter((t) => t.dueDate >= startDate),
    [teamTasks, startDate]
  );

  const completedTasks = useMemo(
    () => filteredTasks.filter((t) => t.status === "completed"),
    [filteredTasks]
  );

  const teamEvents = useMemo(
    () => eventDb.getAll().filter((e) => e.calendarId === teamId),
    [teamId]
  );

  const filteredEvents = useMemo(
    () => teamEvents.filter((e) => e.startDate >= startDate),
    [teamEvents, startDate]
  );

  // === 2️⃣ Активність учасників ===
  const memberActivity = useMemo(() => {
    const map: Record<string, number> = {};
    for (const task of completedTasks) {
      for (const u of task.assignedUsers) {
        map[u] = (map[u] || 0) + 1;
      }
    }
    return Object.entries(map)
      .map(([id, count]) => ({
        user: teamMembers.find((u) => u.id === id),
        count,
      }))
      .filter((a) => a.user)
      .sort((a, b) => b.count - a.count);
  }, [completedTasks, teamMembers]);

  // === 3️⃣ Унікальні користувачі, що були активні ===
  const activeUserIds = useMemo(() => {
    const ids = new Set<string>();
    filteredTasks.forEach((t) => t.assignedUsers.forEach((u) => ids.add(u)));
    filteredEvents.forEach((e) => e.participants.forEach((u) => ids.add(u)));
    return ids;
  }, [filteredTasks, filteredEvents]);

  // === 4️⃣ Відображення ===
  const periodLabel =
    period === "week"
      ? "за останні 7 днів"
      : period === "month"
      ? "за останній місяць"
      : "за весь час";

  return (
    <div className="space-y-6">
      {/* === Перемикач періоду === */}
      <div className="flex gap-2 mb-4">
        {(["week", "month", "all"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              period === p
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {p === "week" && "Тиждень"}
            {p === "month" && "Місяць"}
            {p === "all" && "Увесь час"}
          </button>
        ))}
      </div>

      {/* === Загальна активність === */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-3">Загальна активність</h3>
        <p className="text-gray-600">
          {`Період: ${periodLabel}. `}
          Команда створила <b>{filteredTasks.length}</b> задач,{" "}
          виконала <b>{completedTasks.length}</b>,{" "}
          додано <b>{filteredEvents.length}</b> нових подій,{" "}
          активно брали участь <b>{activeUserIds.size}</b> користувачів.
        </p>
      </div>

      {/* === Топ активних учасників === */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-3">Топ активних учасників</h3>
        {memberActivity.length > 0 ? (
          <ul className="text-gray-700 space-y-1">
            {memberActivity.slice(0, 5).map((entry, idx) => (
              <li key={entry.user!.id}>
                {idx === 0 && "🥇 "}
                {idx === 1 && "🥈 "}
                {idx === 2 && "🥉 "}
                <b>{entry.user!.fullname || entry.user!.username}</b> —{" "}
                {entry.count} задач
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Немає активності у вибраному періоді.</p>
        )}
      </div>
    </div>
  );
};

export default TeamStats;
