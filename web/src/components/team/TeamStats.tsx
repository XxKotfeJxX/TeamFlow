import React, { useMemo, useState } from "react";
import { eventDb, taskDb } from "../../models/mockDB/calendar";
import type { User } from "../../models/mockDB/users";
import { useTranslation } from "../useTranslations";

interface TeamStatsProps {
  teamId: string;
  teamMembers: User[];
}

type Period = "week" | "month" | "all";

const TeamStats: React.FC<TeamStatsProps> = ({ teamId, teamMembers }) => {
  const [period, setPeriod] = useState<Period>("week");
  const { t } = useTranslation();
  const ts = t("teamStats");

  const now = new Date();
  const startDate = useMemo(() => {
    const d = new Date(now);
    if (period === "week") d.setDate(now.getDate() - 7);
    else if (period === "month") d.setMonth(now.getMonth() - 1);
    else d.setFullYear(1970);
    return d;
  }, [period]);

  const teamTasks = useMemo(
    () =>
      taskDb
        .getAll()
        .filter((t) => t.type === "team" && t.calendarId === teamId),
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

  const activeUserIds = useMemo(() => {
    const ids = new Set<string>();
    filteredTasks.forEach((t) => t.assignedUsers.forEach((u) => ids.add(u)));
    filteredEvents.forEach((e) => e.participants.forEach((u) => ids.add(u)));
    return ids;
  }, [filteredTasks, filteredEvents]);

  const periodLabel =
    period === "week"
      ? ts("periodWeek")
      : period === "month"
      ? ts("periodMonth")
      : ts("periodAll");

  return (
    <div className="space-y-6">
      {/* Перемикач періоду */}
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
            {p === "week" && ts("tabWeek")}
            {p === "month" && ts("tabMonth")}
            {p === "all" && ts("tabAll")}
          </button>
        ))}
      </div>

      {/* Загальна активність */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-3">{ts("overallTitle")}</h3>
        <p className="text-gray-600">
          {`${ts("period")}: ${periodLabel}. `}
          {ts("summary")
            .replace("{tasks}", String(filteredTasks.length))
            .replace("{completed}", String(completedTasks.length))
            .replace("{events}", String(filteredEvents.length))
            .replace("{users}", String(activeUserIds.size))}
        </p>
      </div>

      {/* Топ активних учасників */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-3">{ts("topTitle")}</h3>
        {memberActivity.length > 0 ? (
          <ul className="text-gray-700 space-y-1">
            {memberActivity.slice(0, 5).map((entry, idx) => (
              <li key={entry.user!.id}>
                {idx === 0 && "🥇 "}
                {idx === 1 && "🥈 "}
                {idx === 2 && "🥉 "}
                <b>{entry.user!.fullname || entry.user!.username}</b> —{" "}
                {entry.count} {ts("tasks")}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">{ts("noActivity")}</p>
        )}
      </div>
    </div>
  );
};

export default TeamStats;
