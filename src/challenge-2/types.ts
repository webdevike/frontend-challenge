export interface Order {
  id: string
  customerName: string
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  createdAt: string
}

export type SortField = 'customerName' | 'total' | 'createdAt' | 'status'
export type SortDirection = 'asc' | 'desc'
