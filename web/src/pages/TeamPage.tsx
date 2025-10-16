import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { teamDb, type TeamRole } from "../models/mockDB/teams";
import { users, type User } from "../models/mockDB/users";
import TabOverview from "../components/team/TabOverview";
import TeamStats from "../components/team/TeamStats";

const tabs = ["Візитка", "Учасники", "Чати", "Статистика"];

const TeamPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  // === Завжди викликаємо хуки useMemo ===
  const team = useMemo(() => (id ? teamDb.getById(id) : undefined), [id]);

  // === Отримуємо учасників з урахуванням ролей ===
  const teamMembers = useMemo(() => {
    if (!team) return [];

    return team.members
      .map((m) => {
        const user = users.find((u) => u.id === m.userId);
        if (!user) return null;
        // Явно типізуємо role як TeamRole
        return { ...user, role: m.role as TeamRole };
      })
      .filter((m): m is User & { role: TeamRole } => m !== null);
  }, [team]);

  // === Поточний місяць для переходу в календар ===
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  // === Якщо команда не знайдена ===
  if (!team) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Команда не знайдена</p>
        </main>
        <Footer />
      </div>
    );
  }

  // === Основний контент сторінки ===
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-8 pt-[var(--header-height,4rem)]">
        {/* ===== HERO / TEAM HEADER ===== */}
        <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Аватар + Інфо */}
          <div className="flex items-center space-x-4">
            {team.avatarUrl ? (
              <img
                src={team.avatarUrl}
                alt={team.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold">
                {team.name.charAt(0)}
              </div>
            )}

            <div>
              <h1 className="text-2xl font-bold text-gray-900">{team.name}</h1>
              <p className="text-gray-600">
                {team.description || "Без опису команди"}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Учасників: {teamMembers.length}
              </p>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex flex-wrap gap-2">
           <button
  onClick={() => navigate(`/tasks/team/${team.id}`)}
  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition border-none"
>
  Перейти до Завдань
</button>


            <button
              onClick={() => navigate(`/calendar/${team.id}/${currentMonth}`)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition border-none"
            >
              Відкрити Календар
            </button>

            <button className="px-4 py-2 bg-gray-200 rounded-xl text-gray-800 hover:bg-gray-300 transition border-none">
              Запросити
            </button>
          </div>
        </section>

        {/* ===== НАВІГАЦІЙНІ ТАБИ ===== */}
        <nav className="flex space-x-4 mt-8 bg-white rounded-2xl shadow-sm p-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              } border-none outline-none focus:outline-none focus:ring-0`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* ===== ВМІСТ ТАБІВ ===== */}
        <section className="mt-8">
          {/* ВІЗИТКА */}
          {activeTab === "Візитка" && <TabOverview teamId={team.id} />}

          {/* УЧАСНИКИ */}
          {activeTab === "Учасники" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white p-5 rounded-2xl shadow-sm flex flex-col items-center hover:shadow-md transition"
                >
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.username}
                      className="w-16 h-16 rounded-full mb-3 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold mb-3 ">
                      {member.username.charAt(0)}
                    </div>
                  )}

                  <p className="font-semibold text-center text-gray-900">
                    {member.fullname || member.username}
                  </p>
                  <p className="text-sm text-gray-500 text-center">{member.email}</p>

                  <p
                    className={`text-xs mt-1 ${
                      member.role === "admin"
                        ? "text-blue-600 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    роль: {member.role === "admin" ? "адмін" : "учасник"}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ЧАТИ */}
          {activeTab === "Чати" && (
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-[400px]">
              <div className="flex-1 overflow-y-auto mb-4 space-y-2 text-center text-gray-400 mt-16">
                💬 Тут зʼявиться чат команди.
              </div>
              <div className="flex border-t border-gray-200 pt-3">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Напишіть повідомлення..."
                />
                <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                  Надіслати
                </button>
              </div>
            </div>
          )}

          {/* СТАТИСТИКА */}
          {activeTab === "Статистика" && (
            <TeamStats teamId={team.id} teamMembers={teamMembers} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TeamPage;
