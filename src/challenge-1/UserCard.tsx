import type { User } from './types'

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <div className="user-card-avatar">
        {user.name.split(' ').map((n) => n[0]).join('')}
      </div>
      <div className="user-card-info">
        <span className="user-card-name">{user.name}</span>
        <span className="user-card-email">{user.email}</span>
      </div>
      <span className={`user-card-role role-${user.role}`}>{user.role}</span>
    </div>
  )
}
