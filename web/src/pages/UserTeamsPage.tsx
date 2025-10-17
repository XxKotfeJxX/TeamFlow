import { useParams, useNavigate } from "react-router-dom";
import { teams } from "../models/mockDB/teams";
import { userDb } from "../models/mockDB/users";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function UserTeamsPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const user = userDb.getById(userId || "");
  if (!user) {
    return <div className="text-center mt-20 text-gray-600">Користувача не знайдено</div>;
  }

  // 🔹 Знаходимо команди, у яких користувач є учасником
 const userTeams = teams.filter((team) =>
  team.members.some((m) => m.userId === user.id)
);


  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8 pt-20 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Команди користувача {user.fullname || user.username}
        </h1>

        {userTeams.length === 0 ? (
          <p className="text-center text-gray-500">Поки що немає команд 😢</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userTeams.map((team) => (
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
      </main>
      <Footer />
    </>
  );
}
