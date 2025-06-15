
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileAbout from '../components/profile/ProfileAbout'
import ProfileActivity from '../components/profile/ProfileActivity'
import ProfileSettings from '../components/profile/ProfileSettings'

export default function ProfilePage() {
  // Це мок-дані — заміниш після підключення до бекенду
  const user = {
    avatarUrl: 'https://avatars.githubusercontent.com/u/9919?s=280&v=4',
    username: 'andriyko',
    fullName: 'Андрій Шевченко',
    email: 'andriy@example.com',
    bio: 'Повно стековий розробник з інтересом до системного програмування, WebRTC і UI/UX.',
    links: [
      { label: 'GitHub', url: 'https://github.com/andriyko' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/andriyko' },
    ],
    skills: ['C++', 'TypeScript', 'PostgreSQL', 'React', 'Crow', 'TailwindCSS'],
    languages: ['Українська', 'Англійська', 'Польська'],
    timezone: 'Europe/Kyiv',
    createdAt: '2024-12-01T10:15:00Z',
    lastActiveAt: '2025-06-14T20:45:00Z',
    roles: [{ name: 'Адмін' }, { name: 'Розробник' }],
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Профіль користувача</h1>

      <section>
        <ProfileHeader
          avatarUrl={user.avatarUrl}
          username={user.username}
          fullName={user.fullName}
          email={user.email}
          roles={user.roles}
        />
      </section>

      <section>
        <ProfileAbout
          bio={user.bio}
          links={user.links}
          skills={user.skills}
          languages={user.languages}
          timezone={user.timezone}
        />
      </section>

      <section>
        <ProfileActivity
          createdAt={user.createdAt}
          lastActiveAt={user.lastActiveAt}
        />
      </section>

      <section>
        <ProfileSettings />
      </section>
    </main>
  )
}