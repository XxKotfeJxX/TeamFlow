import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import ProfileActivity from "../components/profile/ProfileActivity";
import ProfileSettings from "../components/profile/ProfileSettings";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { userDb } from "../models/mockDB/users";
import { Button } from "../components/ui/button";
import { Pencil } from "lucide-react";
import { Textarea } from "../components/ui/Textarea";
import { Input } from "../components/ui/Input";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const user = id ? userDb.getById(id) : undefined;
  if (!user) return <Navigate to="/login" replace />;

  // 🔹 поточний авторизований користувач
  const currentUserId = localStorage.getItem("currentUserId");
  const isOwner = currentUserId === user.id; // 🔹 тільки власник може редагувати

  const [editableUser, setEditableUser] = useState({
    bio: user.bio || "",
    skills: user.skills.join(", "),
    languages: user.languages.join(", "),
    timezone: user.timezone || "",
  });

  const handleSave = () => {
    userDb.update(user.id, {
      bio: editableUser.bio,
      skills: editableUser.skills.split(",").map((s) => s.trim()),
      languages: editableUser.languages.split(",").map((l) => l.trim()),
      timezone: editableUser.timezone,
    });
    setEditing(false);
  };

  const goToCalendar = () =>
    navigate(
      `/calendar/${user.id}/${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1
      ).padStart(2, "0")}`
    );

  const goToTasks = () => navigate(`/tasks/user/${user.id}`);
  const goToTeams = () => navigate(`/teams/user/${user.id}`);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 pt-20 bg-[#f9fafb] min-h-screen rounded-lg shadow-sm border-t border-gray-200">
        <div className="flex flex-col items-center mb-8">
          {/* 🔹 Фото або ініціал */}
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.username}
              className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-white"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-md">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}

          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {user.fullname || user.username}
          </h1>
          <p className="text-gray-500">{user.email}</p>

          {/* 🔹 Кнопки дій */}
          <div className="flex gap-3 mt-5">
            <Button
              onClick={goToCalendar}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              📅 Календар
            </Button>
            <Button
              onClick={goToTasks}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              ✅ Завдання
            </Button>
            <Button
              onClick={goToTeams}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              👥 Команди
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* ===== ABOUT ===== */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border relative">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Про користувача
              </h2>

              {/* 🔹 Кнопка редагування — тільки для власника */}
              {isOwner && (
                <button
                  onClick={() => setEditing(!editing)}
                  className="text-gray-500 hover:text-blue-600 transition"
                >
                  <Pencil size={18} />
                </button>
              )}
            </div>

            {/* 🔹 Редагування або перегляд */}
            {editing && isOwner ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Біо</label>
                  <Textarea
                    className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={editableUser.bio}
                    onChange={(e) =>
                      setEditableUser({ ...editableUser, bio: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Навички (через кому)
                  </label>
                  <Input
                    className="w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
                    value={editableUser.skills}
                    onChange={(e) =>
                      setEditableUser({
                        ...editableUser,
                        skills: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Мови (через кому)
                  </label>
                  <Input
                    className="w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
                    value={editableUser.languages}
                    onChange={(e) =>
                      setEditableUser({
                        ...editableUser,
                        languages: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Часовий пояс</label>
                  <Input
                    className="w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
                    value={editableUser.timezone}
                    onChange={(e) =>
                      setEditableUser({
                        ...editableUser,
                        timezone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    onClick={() => setEditing(false)}
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Скасувати
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Зберегти
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Біо:</strong> {user.bio || "—"}
                </p>
                <p>
                  <strong>Навички:</strong>{" "}
                  {user.skills.length ? user.skills.join(", ") : "—"}
                </p>
                <p>
                  <strong>Мови:</strong>{" "}
                  {user.languages.length ? user.languages.join(", ") : "—"}
                </p>
                <p>
                  <strong>Часовий пояс:</strong> {user.timezone || "—"}
                </p>
              </div>
            )}
          </section>

          {/* ===== ACTIVITY ===== */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Активність
            </h2>
            <ProfileActivity
              createdAt={user.createdAt.toISOString()}
              lastActiveAt={user.lastActive.toISOString()}
            />
          </section>

          {/* ===== SETTINGS ===== */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border">
            <ProfileSettings
              interfaceLang={user.interfaceLang}
              profileVisibility={user.profileVisibility}
              onChange={(field, value) => {
                if (isOwner) {
                  userDb.update(user.id, { [field]: value });
                }
              }}
            />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
