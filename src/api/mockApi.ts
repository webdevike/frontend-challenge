import type { User } from '../challenge-1/types'
import type { Order } from '../challenge-2/types'

const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', role: 'user' },
  { id: 3, name: 'Carol Williams', email: 'carol.w@example.com', role: 'manager' },
  { id: 4, name: 'David Brown', email: 'david.brown@example.com', role: 'user' },
  { id: 5, name: 'Eva Martinez', email: 'eva.m@example.com', role: 'admin' },
  { id: 6, name: 'Frank Lee', email: 'frank.lee@example.com', role: 'user' },
  { id: 7, name: 'Grace Kim', email: 'grace.kim@example.com', role: 'manager' },
  { id: 8, name: 'Henry Chen', email: 'henry.chen@example.com', role: 'user' },
  { id: 9, name: 'Iris Patel', email: 'iris.patel@example.com', role: 'user' },
  { id: 10, name: 'Jack Wilson', email: 'jack.wilson@example.com', role: 'admin' },
  { id: 11, name: 'Karen Davis', email: 'karen.d@example.com', role: 'user' },
  { id: 12, name: 'Leo Nguyen', email: 'leo.nguyen@example.com', role: 'manager' },
  { id: 13, name: 'Maria Garcia', email: 'maria.garcia@example.com', role: 'user' },
  { id: 14, name: 'Nathan Taylor', email: 'nathan.t@example.com', role: 'user' },
  { id: 15, name: 'Olivia Anderson', email: 'olivia.a@example.com', role: 'admin' },
  { id: 16, name: 'Paul Robinson', email: 'paul.r@example.com', role: 'user' },
  { id: 17, name: 'Quinn Foster', email: 'quinn.foster@example.com', role: 'manager' },
  { id: 18, name: 'Rachel Moore', email: 'rachel.moore@example.com', role: 'user' },
  { id: 19, name: 'Sam Jackson', email: 'sam.jackson@example.com', role: 'user' },
  { id: 20, name: 'Tina White', email: 'tina.white@example.com', role: 'admin' },
]

function randomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function fetchUsers(query: string): Promise<User[]> {
  const delay = randomDelay(200, 600)
  await new Promise((resolve) => setTimeout(resolve, delay))

  const lower = query.toLowerCase()
  if (!lower) return users

  return users.filter(
    (u) =>
      u.name.toLowerCase().includes(lower) ||
      u.email.toLowerCase().includes(lower),
  )
}

const statuses: Order['status'][] = ['pending', 'shipped', 'delivered', 'cancelled']
const customerNames = [
  'Acme Corp', 'Globex Inc', 'Initech', 'Umbrella LLC', 'Stark Industries',
  'Wayne Enterprises', 'Wonka Co', 'Cyberdyne Systems', 'Soylent Corp',
  'Massive Dynamic', 'Hooli', 'Pied Piper', 'Dunder Mifflin', 'Sterling Cooper',
  'Los Pollos', 'Prestige Worldwide', 'TechStart Inc', 'Bluth Company',
  'Vandelay Industries', 'Oceanic Airlines',
]

function generateOrders(): Order[] {
  const orders: Order[] = []
  for (let i = 1; i <= 50; i++) {
    const dayOffset = Math.floor(Math.random() * 90)
    const date = new Date(2025, 0, 1 + dayOffset)
    orders.push({
      id: `ORD-${String(i).padStart(4, '0')}`,
      customerName: customerNames[i % customerNames.length]!,
      status: statuses[i % statuses.length]!,
      total: Math.round((15 + Math.random() * 485) * 100) / 100,
      createdAt: date.toISOString(),
    })
  }
  return orders
}

const orders = generateOrders()

export async function fetchOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return orders
}
