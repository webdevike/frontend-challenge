import { useState } from 'react'
import { fetchUsers } from '../api/mockApi'
import type { User } from './types'

export function UserSearchList() {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState<User[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    fetchUsers(value).then((results) => {
      setUsers(results)
    })
  }

  return (
    <div className="user-search">
      <h2>User Search</h2>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={query}
        onChange={handleChange}
      />
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <span className="user-role">{user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
