// src/pages/Cart.jsx
import React from 'react'
import { useCart } from '../../contexts/CartContext'
import '../../styles/pages/user/Cart.css'

import { Link } from 'react-router-dom'
import productImage from '../../assets/product.jpeg' // fallback image

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) updateQuantity(id, quantity)
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <strong>Your cart is empty</strong>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <button className="clear-cart-btn" onClick={clearCart}>
        Clear Cart
      </button>
      <div className="cart-items">
        {cartItems.map((item) => {
          const imageUrl = item.imageUrl
            ? `http://localhost:5000/${item.imageUrl}`
            : productImage

          return (
            <div key={item.id} className="cart-item">
              <img src={imageUrl} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div className="item-actions">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="cart-summary">
        <h3>Total Amount: ${totalPrice.toFixed(2)}</h3>
        <button className="checkout-btn">
          <Link to="/checkout">Proceed to Checkout</Link>
        </button>
      </div>
    </div>
  )
}

export default Cart
