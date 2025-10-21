import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import ProfileActivity from "../components/profile/ProfileActivity";
import ProfileSettings from "../components/profile/ProfileSettings";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { userDb } from "../models/mockDB/users";
import { Button } from "../components/ui/Button";
import { Pencil, Upload } from "lucide-react";
import { Textarea } from "../components/ui/Textarea";
import { Input } from "../components/ui/Input";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const user = id ? userDb.getById(id) : undefined;
  if (!user) return <Navigate to="/login" replace />;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentUser, setCurrentUser] = useState(user);

  const currentUserId = localStorage.getItem("currentUserId");
  const isOwner = currentUserId === user.id;
  const isPrivate = user.profileVisibility === "private";

  

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editableUser, setEditableUser] = useState({
    username: user.username,
    email: user.email,
    avatarUrl: user.avatarUrl || "",
    bio: user.bio || "",
    skills: user.skills.join(", "),
    languages: user.languages.join(", "),
    timezone: user.timezone || "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditableUser({ ...editableUser, avatarUrl: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  

  const handleSave = () => {
    userDb.update(user.id, {
      username: editableUser.username,
      email: editableUser.email,
      avatarUrl: editableUser.avatarUrl,
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
          {/* Фото */}
          <div className="relative">
            {editableUser.avatarUrl ? (
              <img
                src={editableUser.avatarUrl}
                alt={editableUser.username}
                className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-white"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-md">
                {editableUser.username.charAt(0).toUpperCase()}
              </div>
            )}
            {editing && isOwner && (
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100 text-gray-600">
                <Upload size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>

          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {editableUser.username}
          </h1>
          <p className="text-gray-500">{editableUser.email}</p>
          {!isPrivate || isOwner ? (
            <div className="flex gap-3 mt-5">
              <Button
                onClick={goToCalendar}
                className="bg-emerald-600 hover:bg-emerald-700 text-white hover:border-emerald-800"
              >
                Календар
              </Button>
              <Button
                onClick={goToTasks}
                className="bg-blue-600 hover:bg-blue-700 text-white hover:border-blue-800"
              >
                Завдання
              </Button>
              <Button
                onClick={goToTeams}
                className="bg-purple-600 hover:bg-purple-700 text-white hover:border-purple-800"
              >
                Команди
              </Button>
            </div>
          ) : null}
        </div>

        {isPrivate && !isOwner ? (
          <div className="text-center text-gray-500 italic py-16">
          🔒 Цей профіль приватний. Ви можете бачити лише базову інформацію.
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ===== ABOUT ===== */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border relative">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Про користувача
              </h2>

              {isOwner && (
                <button
                  onClick={() => setEditing(!editing)}
                  className="text-gray-500 hover:text-blue-600 transition hover:border-none"
                >
                  <Pencil size={18} />
                </button>
              )}
            </div>

            {editing && isOwner ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Нікнейм</label>
                  <Input
                    className="w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
                    value={editableUser.username}
                    onChange={(e) =>
                      setEditableUser({ ...editableUser, username: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Ел. пошта</label>
                  <Input
                    className="w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
                    type="email"
                    value={editableUser.email}
                    onChange={(e) =>
                      setEditableUser({ ...editableUser, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Біо</label>
                  <Textarea
                    className="w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
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
                      setEditableUser({ ...editableUser, skills: e.target.value })
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
                      setEditableUser({ ...editableUser, languages: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Часовий пояс</label>
                  <Input
                    className="w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
                    value={editableUser.timezone}
                    onChange={(e) =>
                      setEditableUser({ ...editableUser, timezone: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    onClick={() => setEditing(false)}
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 hover:border-gray-400"
                  >
                    Скасувати
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-800"
                  >
                    Зберегти
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Нікнейм:</strong> {user.username}
                </p>
                <p>
                  <strong>Ел. пошта:</strong> {user.email}
                </p>
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

          <section>
            <ProfileActivity
              createdAt={user.createdAt.toISOString()}
              lastActiveAt={user.lastActive.toISOString()}
            />
          </section>

          <ProfileSettings
  interfaceLang={currentUser.interfaceLang}
  profileVisibility={currentUser.profileVisibility}
  disabled={!isOwner}
  onChange={(field, value) => {
    if (isOwner) {
      userDb.update(currentUser.id, { [field]: value });
      setCurrentUser({ ...currentUser, [field]: value } as typeof currentUser);

      // 🧠 якщо користувач змінює мову — зберігаємо в localStorage
      if (field === "interfaceLang") {
  localStorage.setItem("interfaceLang", value);
  document.documentElement.lang = value;

  // 🔥 кидаємо глобальну подію, щоб Footer міг оновитись
  window.dispatchEvent(new CustomEvent("interfaceLangChange", { detail: value }));
}
    }
  }}
/>

          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
