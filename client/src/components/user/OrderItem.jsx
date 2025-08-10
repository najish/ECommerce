import React from 'react'
import '../../styles/components/user/OrderItem.css'
import { Link } from 'react-router-dom'

const OrderItem = ({ order }) => {
  return (
    <div className="orderItem_container">
      <h3 className="orderItem_orderTitle">Order #{order.id}</h3>
      <p className="orderItem_summary">
        Status: <span className="orderItem_status">{order.status}</span> |
        Total: <span className="orderItem_total">₹{order.total}</span> |
        Payment: <span className="orderItem_payment">{order.paymentMode}</span>
      </p>

      <ul className="orderItem_list">
        {order.orderItems.map((item) => (
          <Link to="/products">
            <li key={item.id} className="orderItem_listItem">
              <strong className="orderItem_productName">
                {item.product.name}
              </strong>{' '}
              — Qty: <span className="orderItem_quantity">{item.quantity}</span>{' '}
              — Price: <span className="orderItem_price">₹{item.price}</span>
              <br />
              <small className="orderItem_description">
                {item.product.description}
              </small>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default OrderItem
