import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { teamDb, type Team, type TeamRole } from "../models/mockDB/teams";
import { users, type User } from "../models/mockDB/users";
import TabOverview from "../components/team/TabOverview";
import TeamStats from "../components/team/TeamStats";
import AddMemberModal from "../components/team/AddMemberModal";
import ConfirmModal from "../components/team/ConfirmModal";

const tabsAll = ["Візитка", "Учасники", "Чати", "Статистика"];
const tabsLimited = ["Візитка", "Учасники"];

const TeamPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>("Візитка");
  const [team, setTeam] = useState<Team | undefined>();
  const [showAddModal, setShowAddModal] = useState(false);

  const [confirmLeaveOpen, setConfirmLeaveOpen] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<{
    userId: string | null;
    open: boolean;
  }>({
    userId: null,
    open: false,
  });
  const [confirmPromote, setConfirmPromote] = useState<{
    userId: string | null;
    open: boolean;
  }>({
    userId: null,
    open: false,
  });

  const currentUserId = localStorage.getItem("currentUserId");

  // === завантаження команди ===
  useEffect(() => {
    if (!id) return;
    const found = teamDb.getById(id);
    setTeam(found);
  }, [id]);

  // === live sync з localStorage ===
  useEffect(() => {
    const sync = () => {
      if (!id) return;
      const updated = teamDb.getById(id);
      if (updated) setTeam({ ...updated });
    };
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "teamsDB" || e.key === "teamProfilesDB") sync();
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", sync);
    };
  }, [id]);

  const notFound = !team;

  const currentRole = team
    ? teamDb.getMemberRole(team.id, currentUserId || "")
    : undefined;
  const isGuest = !currentRole;
  const isAdmin = currentRole === "admin";

  const teamMembers = useMemo(() => {
    if (!team) return [];
    return team.members
      .map((m) => {
        const user = users.find((u) => u.id === m.userId);
        if (!user) return null;
        return { ...user, role: m.role as TeamRole };
      })
      .filter((m): m is User & { role: TeamRole } => m !== null);
  }, [team]);

  if (notFound) {
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

  // === модалка для видалення ===
  const openRemoveConfirm = (userId: string) => {
    setConfirmRemove({ userId, open: true });
  };
  const confirmRemoveUser = () => {
    if (!id || !confirmRemove.userId) return;
    teamDb.removeMember(id, confirmRemove.userId);
    setTeam(teamDb.getById(id));
    setConfirmRemove({ userId: null, open: false });
  };

  // === модалка для підвищення ===
  const openPromoteConfirm = (userId: string) => {
    setConfirmPromote({ userId, open: true });
  };
  const confirmPromoteUser = () => {
    if (!id || !confirmPromote.userId) return;
    teamDb.setRole(id, confirmPromote.userId, "admin");
    setTeam(teamDb.getById(id));
    setConfirmPromote({ userId: null, open: false });
  };

  // === вихід з команди ===
  const handleLeaveTeam = () => setConfirmLeaveOpen(true);

  const confirmLeave = () => {
    if (!id || !currentUserId) return;
    const currentTeam = teamDb.getById(id);
    if (!currentTeam) return;

    const isOwnerLeaving = currentTeam.members.find(
      (m) => m.userId === currentUserId && m.role === "admin"
    );

    if (isOwnerLeaving) {
      const remaining = currentTeam.members.filter(
        (m) => m.userId !== currentUserId
      );
      if (remaining.length === 0) {
        teamDb.delete(id);
        navigate(`/teams/${currentUserId}`);
        return;
      }
      remaining[0].role = "admin";
      teamDb.update(id, { members: remaining });
    } else {
      teamDb.removeMember(id, currentUserId);
    }

    setTeam(teamDb.getById(id));
    setActiveTab("Візитка");
    setConfirmLeaveOpen(false);
  };

  const handleSendRequest = () => {
    alert("Запит на вступ до команди надіслано ✅ (поки що фейк)");
  };

  const visibleTabs = isGuest ? tabsLimited : tabsAll;

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-8 pt-[var(--header-height,4rem)]">
        {/* HERO */}
        <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-4">
            {team.avatarUrl ? (
              <img
                src={team.avatarUrl}
                alt={team.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold">
                {team.name.charAt(0) || "?"}
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

          <div className="flex flex-wrap gap-2">
            {isGuest ? (
              <button
                onClick={handleSendRequest}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Надіслати запит
              </button>
            ) : (
              <div className="flex justify-end flex-wrap gap-2">
                <button
                  onClick={() => navigate(`/tasks/team/${team.id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  Завдання
                </button>

                <button
                  onClick={() =>
                    navigate(`/calendar/${team.id}/${currentMonth}`)
                  }
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 hover:border-emerald-800"
                >
                  Календар
                </button>

                {isAdmin && (
                  <>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-4 py-2 bg-gray-200 rounded-xl text-gray-800 hover:bg-gray-300 hover:border-gray-400"
                    >
                      Додати учасника
                    </button>
                    <AddMemberModal
                      isOpen={showAddModal}
                      teamId={team.id}
                      onClose={() => setShowAddModal(false)}
                      onAdded={() => setTeam(teamDb.getById(team.id))}
                    />
                  </>
                )}

                <button
                  onClick={handleLeaveTeam}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 hover:border-red-300"
                >
                  Покинути команду
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ТАБИ */}
        <nav className="flex space-x-4 mt-8 bg-white rounded-2xl shadow-sm p-2">
          {visibleTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* ВМІСТ */}
        <section className="mt-8">
          {activeTab === "Візитка" && (
            <TabOverview teamId={team.id} canEdit={isAdmin} />
          )}

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
                      {(member.username ?? member.fullname ?? "?")[0] ?? "?"}
                    </div>
                  )}

                  <p className="font-semibold text-center text-gray-900">
                    {member.fullname || member.username}
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    {member.email}
                  </p>

                  <p
                    className={`text-xs mt-1 ${
                      member.role === "admin"
                        ? "text-blue-600 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    роль: {member.role === "admin" ? "адмін" : "учасник"}
                  </p>

                  <div className="flex gap-2 mt-3">
                    {isAdmin && member.id !== currentUserId && (
                      <button
                        onClick={() => openRemoveConfirm(member.id)}
                        className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 hover:border-red-300"
                      >
                        Видалити
                      </button>
                    )}
                    {isAdmin &&
                      member.role !== "admin" &&
                      member.id !== currentUserId && (
                        <button
                          onClick={() => openPromoteConfirm(member.id)}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 hover:border-blue-300"
                        >
                          Адмін
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Чати" && !isGuest && (
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-[400px]">
              <div className="flex-1 overflow-y-auto mb-4 text-center text-gray-400 mt-16">
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

          {activeTab === "Статистика" && !isGuest && (
            <TeamStats teamId={team.id} teamMembers={teamMembers} />
          )}
        </section>
      </main>

      <Footer />

      {/* 🔸 МОДАЛКИ ПІДТВЕРДЖЕНЬ 🔸 */}
      <ConfirmModal
        isOpen={confirmLeaveOpen}
        title="Покинути команду"
        message="Ти справді хочеш вийти з цієї команди? Якщо ти власник, права перейдуть іншому учаснику або команда буде видалена."
        confirmText="Покинути"
        confirmColor="bg-red-600 hover:bg-red-700"
        onCancel={() => setConfirmLeaveOpen(false)}
        onConfirm={confirmLeave}
      />

      <ConfirmModal
        isOpen={confirmRemove.open}
        title="Видалення учасника"
        message="Видалити цього учасника з команди?"
        confirmText="Видалити"
        confirmColor="bg-red-600 hover:bg-red-700"
        onCancel={() => setConfirmRemove({ userId: null, open: false })}
        onConfirm={confirmRemoveUser}
      />

      <ConfirmModal
        isOpen={confirmPromote.open}
        title="Підвищення до адміна"
        message="Зробити цього учасника адміністратором команди?"
        confirmText="Підвищити"
        confirmColor="bg-blue-600 hover:bg-blue-700"
        onCancel={() => setConfirmPromote({ userId: null, open: false })}
        onConfirm={confirmPromoteUser}
      />
    </div>
  );
};

export default TeamPage;
