import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/pages/user/Orders.css'
const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token') // Or useContext(AuthContext)
        const res = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setOrders(res.data)
      } catch (err) {
        console.error(err)
        setError('Failed to load orders.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading)
    return <div className="orders-wrapper">Loading your orders...</div>
  if (error) return <div className="orders-wrapper error">{error}</div>
  if (orders.length === 0)
    return <div className="orders-wrapper">No orders yet.</div>

  return (
    <div className="orders-wrapper">
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <span>Order #{order.id}</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="order-status">Status: {order.status}</div>
          <div className="order-total">Total: ₹{order.totalAmount}</div>
          <div className="order-items">
            {order.items !== undefined && order.items.length > 0 ? (
              order.items.map((item) => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <div>{item.name}</div>
                    <div>Qty: {item.quantity}</div>
                    <div>Price: ₹{item.price}</div>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders
