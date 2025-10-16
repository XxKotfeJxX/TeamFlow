import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { teamDb } from "../models/mockDB/teams";
import { users, type User } from "../models/mockDB/users";
import TabOverview from "../components/team/TabOverview";

const tabs = ["Візитка", "Учасники", "Чати", "Статистика"];

const TeamPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  // знайти команду
  const team = id ? teamDb.getById(id) : undefined;
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

  const teamMembers: User[] = users.filter((u) => team.members.includes(u.id));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-8 pt-[var(--header-height,4rem)]">
        {/* ====== HERO / TEAM HEADER ====== */}
        <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-4">
  {team.avatarUrl ? (
    <img
      src={team.avatarUrl}
      alt={team.name}
      className="w-20 h-20 rounded-full object-cover"
    />
  ) : (
    <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold">
      {team.name.charAt(0)}
    </div>
  )}

  <div>
    {/* Назва команди — темний текст */}
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
    onClick={() => navigate(`/team/${team.id}/tasks`)}
    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition border-none"
  >
    Перейти до Завдань
  </button>

  <button
    onClick={() => {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      navigate(`/calendar/${team.id}/${yyyy}-${mm}`);
    }}
    className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition border-none"
  >
    Відкрити Календар
  </button>

  <button className="px-4 py-2 bg-gray-200 rounded-xl text-gray-800 hover:bg-gray-300 transition border-none">
    Запросити
  </button>
</div>

        </section>

        {/* ====== ТАБИ ====== */}
        <nav className="flex space-x-4 mt-8 bg-white rounded-2xl shadow-sm p-2">
  {tabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200
        ${
          activeTab === tab
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
        }
        border-none outline-none focus:outline-none focus:ring-0`}
    >
      {tab}
    </button>
  ))}
</nav>


        {/* ====== ВМІСТ ТАБІВ ====== */}
        <section className="mt-8">
          {/* 1️⃣ ВІЗИТКА */}
          {activeTab === "Візитка" && (
  <TabOverview teamId={team.id}/>
)}


          {/* 2️⃣ УЧАСНИКИ */}
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
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold mb-3">
                      {member.username.charAt(0)}
                    </div>
                  )}
                  <p className="font-semibold text-center">
                    {member.fullname || member.username}
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    {member.email}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">роль: учасник</p>
                </div>
              ))}
            </div>
          )}

          {/* 3️⃣ ЧАТИ */}
          {activeTab === "Чати" && (
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-[400px]">
              <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                {/* Заглушка чатів */}
                <div className="text-gray-400 text-center mt-20">
                  💬 Тут зʼявиться чат команди.
                </div>
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

          {/* 4️⃣ СТАТИСТИКА */}
          {activeTab === "Статистика" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Загальна активність
                </h3>
                <p className="text-gray-600">
                  Команда виконала 34 задачі за останні 7 днів, 12 нових подій
                  додано в календар, 8 користувачів активно в чаті.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Топ активних учасників
                </h3>
                <ul className="text-gray-700 space-y-1">
                  <li>🥇 <b>Марія</b> — 14 задач</li>
                  <li>🥈 <b>Олег</b> — 10 задач</li>
                  <li>🥉 <b>Андрій</b> — 8 задач</li>
                </ul>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TeamPage;
