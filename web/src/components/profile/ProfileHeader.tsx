import { Pencil } from 'lucide-react'
import { Button } from '../../components/ui/button'

type Role = {
  name: string
  teamName?: string
}

type ProfileHeaderProps = {
  avatarUrl?: string
  username: string
  fullName?: string
  email: string
  roles: Role[]
  onEdit?: () => void
}

export default function ProfileHeader({
  avatarUrl,
  username,
  fullName,
  email,
  roles,
  onEdit,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-start justify-between p-6 bg-white rounded-2xl shadow-md mb-6">
      <div className="flex items-center gap-6">
        <img
          src={avatarUrl || '/placeholder-avatar.png'}
          alt="User avatar"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{username}</h2>
          {fullName && <p className="text-gray-700">{fullName}</p>}
          <p className="text-sm text-gray-500">{email}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {roles.map((role, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {role.name}
                {role.teamName ? ` @ ${role.teamName}` : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Pencil className="w-5 h-5 text-blue-500" />
        </Button>
    </div>
  )
}