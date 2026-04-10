import { useState, useEffect } from 'react'
import { fetchOrders } from '../api/mockApi'
import type { Order, SortField, SortDirection } from './types'

const PAGE_SIZE = 10

export function OrderDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)

  // Derived state stored in useState — the core anti-pattern
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [sortedOrders, setSortedOrders] = useState<Order[]>([])
  const [paginatedOrders, setPaginatedOrders] = useState<Order[]>([])
  const [totalPages, setTotalPages] = useState(1)

  // Fetch with no cleanup
  useEffect(() => {
    setLoading(true)
    fetchOrders().then((data) => {
      setOrders(data)
      setLoading(false)
    })
  }, [])

  // Filter effect — syncs derived state
  useEffect(() => {
    let result = orders

    if (statusFilter !== 'all') {
      result = result.filter((order) => order.status === statusFilter)
    }

    if (searchQuery) {
      const lower = searchQuery.toLowerCase()
      result = result.filter(
        (order) =>
          order.customerName.toLowerCase().includes(lower) ||
          order.id.toLowerCase().includes(lower),
      )
    }

    setFilteredOrders(result)
  }, [orders, statusFilter, searchQuery])

  // Sort effect — watches filteredOrders
  useEffect(() => {
    const sorted = [...filteredOrders].sort((a, b) => {
      let comparison = 0

      if (sortField === 'customerName') {
        comparison = a.customerName.localeCompare(b.customerName)
      } else if (sortField === 'total') {
        comparison = a.total - b.total
      } else if (sortField === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortField === 'status') {
        comparison = a.status.localeCompare(b.status)
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

    setSortedOrders(sorted)
  }, [filteredOrders, sortField, sortDirection])

  // Pagination effect — watches sortedOrders
  useEffect(() => {
    const pages = Math.max(1, Math.ceil(sortedOrders.length / PAGE_SIZE))
    setTotalPages(pages)

    const start = (currentPage - 1) * PAGE_SIZE
    setPaginatedOrders(sortedOrders.slice(start, start + PAGE_SIZE))
  }, [sortedOrders, currentPage])

  // Reset page when filters change — extra effect that triggers a re-render cycle
  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilter, searchQuery, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  if (loading) {
    return <p>Loading orders...</p>
  }

  return (
    <div>
      <h2>Order Dashboard</h2>

      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#888' }}>
          {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
        </span>
      </div>

      <table>
        <thead>
          <tr>
            <th
              className="sortable"
              onClick={() => handleSort('customerName')}
              style={{ cursor: 'pointer' }}
            >
              Customer {sortField === 'customerName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th>Order ID</th>
            <th
              className="sortable"
              onClick={() => handleSort('status')}
              style={{ cursor: 'pointer' }}
            >
              Status {sortField === 'status' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              className="sortable"
              onClick={() => handleSort('total')}
              style={{ cursor: 'pointer' }}
            >
              Total {sortField === 'total' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              className="sortable"
              onClick={() => handleSort('createdAt')}
              style={{ cursor: 'pointer' }}
            >
              Date {sortField === 'createdAt' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{order.id}</td>
              <td>
                <span className={`status-badge status-${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
              <td>
                {'$' + order.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td>
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
            </tr>
          ))}
          {paginatedOrders.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                No orders match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#aaa' }}>
          Showing {((currentPage - 1) * PAGE_SIZE) + 1}–{Math.min(currentPage * PAGE_SIZE, filteredOrders.length)} of{' '}
          {'$' + filteredOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total
        </span>
      </div>
    </div>
  )
}
