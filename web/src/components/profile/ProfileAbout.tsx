import { Pencil } from 'lucide-react'
import { Button } from '../../components/ui/button'

type ProfileAboutProps = {
  bio?: string
  skills: string[]
  links: { label: string; url: string }[]
  languages: string[]
  timezone?: string
  onEdit?: () => void
}

export default function ProfileAbout({
  bio,
  skills,
  links,
  languages,
  timezone,
  onEdit,
}: ProfileAboutProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Про себе</h3>
        {onEdit && (
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Pencil className="w-5 h-5" />
          </Button>
        )}
      </div>

      {bio && <p className="text-gray-700 mb-4 whitespace-pre-line">{bio}</p>}

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 mb-1">Скіли</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="bg-gray-100 text-sm text-gray-800 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 mb-1">Посилання</h4>
        <ul className="list-disc list-inside space-y-1">
          {links.map((link, i) => (
            <li key={i}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 mb-1">Мови</h4>
        <p className="text-gray-700">{languages.join(', ')}</p>
      </div>

      {timezone && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-1">Часовий пояс</h4>
          <p className="text-gray-700">{timezone}</p>
        </div>
      )}
    </div>
  )
}