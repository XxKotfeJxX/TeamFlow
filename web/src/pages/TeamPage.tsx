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
import TeamChat from "../components/team/TeamChat";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";

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
   <>
     <Header />

     <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50">
       {/* 🔹 Градієнтні бліки */}
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

       <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-24">
         {/* 🔹 HERO */}
         <section className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-gray-100">
           {/* 🔸 Ліва частина */}
           <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 text-center sm:text-left">
             {team.avatarUrl ? (
               <img
                 src={team.avatarUrl}
                 alt={team.name}
                 className="w-24 h-24 rounded-full object-cover mb-3 sm:mb-0 shadow-md border-4 border-white"
               />
             ) : (
               <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white mb-3 sm:mb-0 shadow-md">
                 {team.name.charAt(0) || "?"}
               </div>
             )}
             <div>
               <h1 className="text-3xl font-bold text-gray-800">{team.name}</h1>
               <p className="text-gray-600">
                 {team.description || "Без опису команди"}
               </p>
               <p className="text-sm text-gray-400 mt-1">
                 👥 Учасників: {teamMembers.length}
               </p>
             </div>
           </div>

           {/* 🔸 Кнопки */}
           <div className="w-full flex flex-col sm:flex-row sm:flex-wrap sm:justify-end gap-2">
             {isGuest ? (
               <Button
                 onClick={handleSendRequest}
                 className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-sm hover:shadow-md transition"
               >
                 Надіслати запит
               </Button>
             ) : (
               <>
                 <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto justify-end">
                   <Button
                     onClick={() => navigate(`/tasks/team/${team.id}`)}
                     className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-sm hover:shadow-md transition"
                   >
                     Завдання
                   </Button>

                   <Button
                     onClick={() =>
                       navigate(`/calendar/${team.id}/${currentMonth}`)
                     }
                     className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-sm hover:shadow-md transition"
                   >
                     Календар
                   </Button>
                 </div>

                 {isAdmin && (
                   <Button
                     onClick={() => setShowAddModal(true)}
                     className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-2xl"
                   >
                     Додати учасника
                   </Button>
                 )}

                 <Button
                   onClick={handleLeaveTeam}
                   className="bg-red-100 text-red-600 hover:bg-red-200 rounded-2xl"
                 >
                   Покинути команду
                 </Button>

                 {isAdmin && (
                   <AddMemberModal
                     isOpen={showAddModal}
                     teamId={team.id}
                     onClose={() => setShowAddModal(false)}
                     onAdded={() => setTeam(teamDb.getById(team.id))}
                   />
                 )}
               </>
             )}
           </div>
         </section>

         {/* 🔹 Таби */}
         <nav className="flex space-x-2 sm:space-x-4 mt-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 p-2">
           {visibleTabs.map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                 activeTab === tab
                   ? "bg-blue-600 text-white shadow-sm"
                   : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
               }`}
             >
               {tab}
             </button>
           ))}
         </nav>

         {/* 🔹 Контент */}
         <section className="mt-8">
           {activeTab === "Візитка" && (
             <TabOverview teamId={team.id} canEdit={isAdmin} />
           )}

           {activeTab === "Учасники" && (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {teamMembers.map((member) => (
                 <div
                   key={member.id}
                   className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-center transition"
                 >
                   {member.avatarUrl ? (
                     <img
                       src={member.avatarUrl}
                       alt={member.username}
                       className="w-16 h-16 rounded-full mb-3 object-cover shadow-sm"
                     />
                   ) : (
                     <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold mb-3">
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
                       <Button
                         onClick={() => openRemoveConfirm(member.id)}
                         className="bg-red-100 text-red-600 hover:bg-red-200 text-xs rounded-xl"
                       >
                         Видалити
                       </Button>
                     )}
                     {isAdmin &&
                       member.role !== "admin" &&
                       member.id !== currentUserId && (
                         <Button
                           onClick={() => openPromoteConfirm(member.id)}
                           className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs rounded-xl"
                         >
                           Адмін
                         </Button>
                       )}
                   </div>
                 </div>
               ))}
             </div>
           )}

           {activeTab === "Чати" && !isGuest && currentUserId && (
             <div className="overflow-y-hidden">
               <TeamChat teamId={team.id} currentUserId={currentUserId} />
             </div>
           )}

           {activeTab === "Статистика" && !isGuest && (
             <div className="overflow-x-auto">
               <TeamStats teamId={team.id} teamMembers={teamMembers} />
             </div>
           )}
         </section>
       </main>

       <Footer />

       {/* 🔸 Модалки підтверджень */}
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
   </>
 );


};

export default TeamPage;
