import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { calendars, taskDb, type Task } from "../models/mockDB/calendar";
import { teamDb, type Team } from "../models/mockDB/teams";
import { users, type User } from "../models/mockDB/users";
import { useTranslation } from "../components/useTranslations";

const TasksPage: React.FC = () => {
  const { ownerType, ownerId } = useParams<{
    ownerType: "user" | "team";
    ownerId: string;
  }>();

  const { t } = useTranslation();
  const tt = t("tasksPage");

  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [tasksState, setTasksState] = useState<Task[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  const owner = useMemo(() => {
    if (ownerType === "team") return teamDb.getById(ownerId!);
    if (ownerType === "user") return users.find((u) => u.id === ownerId!);
    return undefined;
  }, [ownerType, ownerId]);

  const calendar = useMemo(() => {
    return calendars.find(
      (c) => c.ownerType === ownerType && c.ownerId === ownerId
    );
  }, [ownerType, ownerId]);

  const tasks = useMemo(() => {
    if (!calendar) return [];
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

  if (!owner || !calendar) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center text-gray-500 text-lg">
          {tt("notFound")}
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

  const confirmDelete = (task: Task) => setDeleteTarget(task);
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    taskDb.delete(deleteTarget.id);
    setTasksState([...taskDb.getAll()]);
    setDeleteTarget(null);
  };
  const handleCancelDelete = () => setDeleteTarget(null);

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-900">
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

        <main className="relative z-10 flex-1 container mx-auto px-6 md:px-12 lg:px-24 py-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-10 text-center text-gray-800"
          >
            {tt("forOwner").replace("{{owner}}", ownerLabel)}
          </motion.h1>

          <div className="flex justify-center gap-3 mb-10">
            {(["all", "active", "done"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    : "bg-white/70 backdrop-blur-md border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {f === "all"
                  ? tt("all")
                  : f === "done"
                  ? tt("done")
                  : tt("active")}
              </button>
            ))}
          </div>

          <div className="grid gap-4 max-w-3xl mx-auto">
            {filtered.map((task: Task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`bg-white/70 backdrop-blur-md border border-gray-100 p-5 rounded-2xl shadow-sm flex items-start justify-between hover:shadow-md transition ${
                  task.status === "completed"
                    ? "opacity-70 border-green-300"
                    : ""
                }`}
              >
                <div>
                  <p
                    className={`font-semibold text-base ${
                      task.status === "completed"
                        ? "text-gray-600 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-sm text-gray-500">{task.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {task.status === "completed"
                      ? tt("statusCompleted")
                      : tt("statusActive")}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(task.id)}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                      task.status === "completed"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {task.status === "completed" ? tt("undo") : tt("markDone")}
                  </button>
                  <button
                    onClick={() => confirmDelete(task)}
                    className="px-3 py-1.5 bg-red-100 text-red-700 rounded-xl text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    {tt("delete")}
                  </button>
                </div>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <p className="text-gray-400 text-center mt-10">{tt("noTasks")}</p>
            )}
          </div>
        </main>
      </div>

      <Footer />

      {deleteTarget && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl p-8 w-[90%] max-w-sm text-center"
          >
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              {tt("confirmDeleteTitle")}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {tt("confirmDeleteText").replace("{{title}}", deleteTarget.title)}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
              >
                {tt("cancel")}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition"
              >
                {tt("confirm")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default TasksPage;
