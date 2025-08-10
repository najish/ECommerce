import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/pages/user/Orders.css'
import { OrderItem } from '../../components/user'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [statuses, setStatuses] = useState(['All'])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))

        const res = await axios.get(
          `http://localhost:5000/api/orders/${user.id}/products`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const fetchedOrders = Array.isArray(res.data.orders)
          ? res.data.orders
          : []

        setOrders(fetchedOrders)
        setFilteredOrders(fetchedOrders)
      } catch (err) {
        console.error(err)
        setError('Failed to load orders.')
      }
    }

    const fetchStatuses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/status')
        if (Array.isArray(res.data)) {
          setStatuses(['All', ...res.data])
        } else {
          setStatuses(['All'])
        }
      } catch (err) {
        console.error(err)
        setStatuses(['All'])
      }
    }

    Promise.all([fetchOrders(), fetchStatuses()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredOrders(orders)
    } else {
      setFilteredOrders(orders.filter((order) => order.status === statusFilter))
    }
  }, [statusFilter, orders])

  if (loading)
    return <div className="orders-wrapper">Loading your orders...</div>
  if (error) return <div className="orders-wrapper error">{error}</div>
  if (orders.length === 0)
    return <div className="orders-wrapper">No orders yet.</div>

  return (
    <div className="orders-wrapper">
      <div className="orders-filter">
        <h2>Your Orders</h2>
        <div>
          <label>
            <strong>Status</strong>
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredOrders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  )
}

export default Orders
