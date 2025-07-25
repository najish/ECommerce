import React, { useState, useEffect } from 'react'
import '../../styles/pages/admin/AdminOrders.css'
import axios from 'axios'

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders')
        setOrders(response.data)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch orders')
        setLoading(false)
        console.error(error)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="admin-orders-container">
      <h2 className="admin-orders-title">Orders</h2>
      {loading ? (
        <p className="admin-orders-message">Loading...</p>
      ) : error ? (
        <p className="admin-orders-error">{error}</p>
      ) : orders.length > 0 ? (
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id || index}>
                  <td>{index + 1}</td>
                  <td>{order._id || order.id}</td>
                  <td>{order.user?.name || 'N/A'}</td>
                  <td>₹{order.totalAmount?.toFixed(2)}</td>
                  <td>{order.status || 'Pending'}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <div>No Orders Placed</div>
      )}
    </div>
  )
}

export default AdminOrders
