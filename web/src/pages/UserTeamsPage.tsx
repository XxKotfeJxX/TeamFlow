// src/pages/UserTeamsPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { teamDb, type Team } from "../models/mockDB/teams";
import { calendarDb } from "../models/mockDB/calendar";
import { userDb } from "../models/mockDB/users";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { useTranslation } from "../components/useTranslations";

export default function UserTeamsPage() {
  const { t } = useTranslation();
  const tp = t("userTeamsPage");

  const { userId } = useParams<{ userId: string }>();
  const user = userDb.getById(userId || "");

  const [view, setView] = useState<"all" | "mine" | "create">("all");
  const [search, setSearch] = useState("");
  const [teamsState, setTeamsState] = useState<Team[]>(teamDb.getAll());
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    avatarUrl: "",
  });

  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-50 text-gray-600">
        <Header />
        <main className="flex-1 flex items-center justify-center text-lg">
          {tp("userNotFound")}
        </main>
        <Footer />
      </div>
    );
  }

  const filtered = useMemo(() => {
    let list = teamsState;
    if (view === "mine") {
      list = list.filter(
        (t) =>
          Array.isArray(t.members) &&
          t.members.some((m) => m.userId === user.id)
      );
    }
    if (search.trim()) {
      list = list.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list;
  }, [view, search, teamsState, user.id]);

  const handleCreate = () => {
    if (!newTeam.name.trim()) {
      alert(tp("enterName"));
      return;
    }

    const created = teamDb.create({
      name: newTeam.name,
      description: newTeam.description,
      avatarUrl: newTeam.avatarUrl || "",
      members: [{ userId: user.id, role: "admin" }],
    });

    calendarDb.create({
      name: `${tp("calendarPrefix")} ${created.name}`,
      ownerType: "team",
      ownerId: created.id,
    });

    setTeamsState([...teamDb.getAll()]);
    setNewTeam({ name: "", description: "", avatarUrl: "" });
    setView("mine");
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-800">
        {/* 🔹 Градієнтні плями */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />
        </motion.div>

        <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-24">
          {/* Заголовок */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-10 text-center text-gray-900"
          >
            {tp("pageTitle")} {user.fullname || user.username}
          </motion.h1>

          {/* Меню вкладок */}
          <div className="flex justify-center gap-4 mb-10">
            {[
              { id: "all", label: tp("allTeams") },
              { id: "mine", label: tp("myTeams") },
              { id: "create", label: tp("createTeam") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id as "all" | "mine" | "create")}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                  view === tab.id
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    : "bg-white/70 backdrop-blur-md border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Пошук */}
          {view !== "create" && (
            <div className="mb-10 text-center">
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={tp("searchPlaceholder")}
                className="w-full max-w-md mx-auto rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Створення команди */}
          {view === "create" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/70 backdrop-blur-md border border-gray-100 shadow-md rounded-2xl p-8 max-w-lg mx-auto"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                {tp("newTeam")}
              </h2>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder={tp("teamName")}
                  value={newTeam.name}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 p-3"
                />

                <Textarea
                  placeholder={tp("description")}
                  value={newTeam.description}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 min-h-[100px]"
                />

                {/* Аватар */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {tp("avatar")}
                  </label>
                  {newTeam.avatarUrl && (
                    <div className="flex justify-center">
                      <img
                        src={newTeam.avatarUrl}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover border mb-2 shadow-sm"
                      />
                    </div>
                  )}

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewTeam({
                          ...newTeam,
                          avatarUrl: reader.result as string,
                        });
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
                  />
                </div>

                <button
                  onClick={handleCreate}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition"
                >
                  {tp("create")}
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Список команд */}
              {filtered.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">
                  {tp("noTeams")}
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filtered.map((team, i) => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      onClick={() => navigate(`/team/${team.id}`)}
                      className="p-5 bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        {team.avatarUrl ? (
                          <img
                            src={team.avatarUrl}
                            alt={team.name}
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
                            {(team.name && team.name[0]?.toUpperCase()) || "?"}
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {team.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {team.description || tp("noDescription")}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
