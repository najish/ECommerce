import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartContext'
import '../styles/pages/Checkout.css'
import axios from 'axios'
import { useUser } from '../contexts/UserContext'
import UPIQRCode from '../components/UPIQRCode'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { cartItems, totalQuantity, clearCart } = useCart()
  const { user } = useUser()

  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    if (cartItems.length === 0) {
      setMessage('❌ Your cart is empty.')
    }
  }, [])

  const handleCheckout = async () => {
    if (!user) {
      setMessage('❌ Please log in to place the order.')
      return
    }

    if (!address.trim()) {
      setMessage('❌ Shipping address is required.')
      return
    }

    try {
      setIsSubmitting(true)

      const orderData = {
        address,
        paymentMethod,
        items: cartItems,
        user,
        totalAmount,
      }

      const res = await axios.post(
        'http://localhost:5000/api/placeOrder',
        orderData
      )

      setMessage('✅ Order placed successfully!')
      clearCart()
      setAddress('')
      setPaymentMethod('cod')
      navigate('/')
    } catch (err) {
      console.error(err)
      setMessage('❌ Something went wrong. Try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="checkout-container">
      <h2>🛒 Checkout</h2>

      {!user && (
        <div>
          <li>
            <strong>Please Login ❤️</strong>
          </li>
        </div>
      )}

      <div className="checkout-form">
        <label htmlFor="address">Shipping Address:</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full shipping address"
        />

        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cod">Cash on Delivery</option>
          <option value="card">Card (Demo)</option>
          <option value="upi">UPI</option>
          <option value="qr">QR Code</option>
        </select>

        <button
          onClick={handleCheckout}
          disabled={
            !user || !address.trim() || isSubmitting || cartItems.length === 0
          }
        >
          🧾 Place Order
        </button>

        {message && (
          <p className={message.startsWith('✅') ? 'success' : 'error'}>
            {message}
          </p>
        )}
      </div>

      {paymentMethod === 'qr' && (
        <div className="qr-code-section">
          <UPIQRCode
            upiId="zafer@upi"
            payeeName="Zafer Eqbal"
            amount={totalAmount.toFixed(2)}
          />
        </div>
      )}
    </div>
  )
}

export default Checkout
