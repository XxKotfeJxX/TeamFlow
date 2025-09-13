import { useParams, Navigate } from "react-router-dom"
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileAbout from '../components/profile/ProfileAbout'
import ProfileActivity from '../components/profile/ProfileActivity'
import ProfileSettings from '../components/profile/ProfileSettings'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { userDb } from "../models/mockDB/users"

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>()
  const user = id ? userDb.getById(id) : undefined

  // якщо користувача не знайдено — редірект на логін
  if (!user) return <Navigate to="/login" replace />

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 pt-20 border-t border-gray-200 rounded-lg bg-[#f9fafb] shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Профіль користувача</h1>
        <div className="max-w-4xl mx-auto space-y-8">

          <section>
            <ProfileHeader
              avatarUrl={user.avatarUrl || ""}
              username={user.username}
              fullName={user.fullname || ""}
              email={user.email}
              roles={user.teams.map(teamId => ({ name: "Учасник", teamName: teamId }))} // тимчасово
            />
          </section>

          <section>
            <ProfileAbout
              bio={user.bio || ""}
              links={user.links.map(url => ({ label: url, url }))}
              skills={user.skills}
              languages={user.languages}
              timezone={user.timezone || ""}
            />
          </section>

          <section>
            <ProfileActivity
              createdAt={user.createdAt.toISOString()}
              lastActiveAt={user.lastActive.toISOString()}
            />
          </section>

          <section>
            <ProfileSettings
  interfaceLang={user.interfaceLang}
  profileVisibility={user.profileVisibility}
  onChange={(field, value) => {
    // тут можна викликати userDb.update(user.id, { [field]: value })
    console.log(field, value)
  }}
/>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
