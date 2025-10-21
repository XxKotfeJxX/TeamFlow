import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { teamDb, type Team } from "../models/mockDB/teams";
import { userDb } from "../models/mockDB/users";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";

export default function UserTeamsPage() {
  const { userId } = useParams<{ userId: string }>();
  const user = userDb.getById(userId || "");

  const [view, setView] = useState<"all" | "mine" | "create">("all");
  const [search, setSearch] = useState("");
  const [teamsState, setTeamsState] = useState<Team[]>(teamDb.getAll());

  const [newTeam, setNewTeam] = useState({ name: "", description: "", avatarUrl: "" });

  const navigate = useNavigate();

  if (!user) {
    return <div className="text-center mt-20 text-gray-600">Користувача не знайдено</div>;
  }

  // 🔹 Фільтровані команди
  const filtered = useMemo(() => {
    let list = teamsState;
    if (view === "mine") {
      list = list.filter(t => t.members.some(m => m.userId === user.id));
    }
    if (search.trim()) {
      list = list.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
    }
    return list;
  }, [view, search, teamsState , user.id]);

  // 🔹 Створення команди
  const handleCreate = () => {
    if (!newTeam.name.trim()) return console.log("Введіть назву команди");

    const created = teamDb.create({
      name: newTeam.name,
      description: newTeam.description,
      avatarUrl: newTeam.avatarUrl || "",
      members: [{ userId: user.id, role: "admin" }],
    });

    setTeamsState([...teamDb.getAll()]);
    setNewTeam({ name: "", description: "", avatarUrl: "" });
    setView("mine");
    console.log(`Команду "${created.name}" створено ✅`);
  };

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8 pt-20 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Команди користувача {user.fullname || user.username}
        </h1>

        {/* 🔹 Меню */}
        <div className="flex justify-center gap-4 mb-6">
          {[
            { id: "all", label: "Всі команди" },
            { id: "mine", label: "Мої команди" },
            { id: "create", label: "Створити команду" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as "all" | "mine" | "create")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                view === tab.id
                  ? "bg-blue-600 text-white hover:border-blue-700"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700 border border-transparent hover:border-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🔹 Пошук */}
        {view !== "create" && (
          <div className="mb-6 text-center">
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук команди..."
              className="px-4 py-2 border rounded-lg w-full max-w-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        )}

        {/* 🔹 Створення команди */}
        {view === "create" ? (
          <div className="bg-white shadow-sm border rounded-xl p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Нова команда</h2>

  <div className="space-y-3">
    <Input
      type="text"
      placeholder="Назва команди"
      value={newTeam.name}
      onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
      className="w-full px-4 py-2 border rounded-lg"
    />

    <Textarea
      placeholder="Опис"
      value={newTeam.description}
      onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
      className="w-full px-4 py-2 border rounded-lg min-h-[100px]"
    />

    {/* Вибір зображення */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Аватар команди
      </label>

      {/* Попередній перегляд */}
      {newTeam.avatarUrl && (
        <div className="flex justify-center">
          <img
            src={newTeam.avatarUrl}
            alt="Прев’ю"
            className="w-24 h-24 rounded-full object-cover border mb-2"
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
            setNewTeam({ ...newTeam, avatarUrl: reader.result as string });
          };
          reader.readAsDataURL(file);
        }}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
      />
    </div>

    <button
      onClick={handleCreate}
      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Створити
    </button>
  </div>
</div>

        ) : (
          <>
            {/* 🔹 Перелік команд */}
            {filtered.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">Команд не знайдено 😢</p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map((team) => (
                  <div
                    key={team.id}
                    className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
                    onClick={() => navigate(`/team/${team.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      {team.avatarUrl ? (
                        <img
                          src={team.avatarUrl}
                          alt={team.name}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                          {team.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800">{team.name}</h3>
                        <p className="text-sm text-gray-500">{team.description || "Без опису"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
