import React, { useEffect, useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import '../../styles/pages/user/Checkout.css'
import axios from 'axios'
import { useUser } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { AddressList } from '../../components/user'
import UPIQRCode from '../../components/user/UPIQRCode'

const Checkout = () => {
  const { cartItems, clearCart } = useCart()
  const { user } = useUser()
  const navigate = useNavigate()

  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    if (cartItems.length === 0) {
      setMessage('❌ Your cart is empty.')
    }

    if (user) {
      fetchAddresses()
    }
  }, [user, addresses])

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/address/${user.id}`
      )
      setAddresses(res.data)
      if (res.data.length > 0) {
        setSelectedAddressId(res.data[0].id)
      }
    } catch (err) {
      console.error('Failed to fetch addresses:', err)
    }
  }

  const handleCheckout = async () => {
    if (!user) {
      setMessage('❌ Please log in to place the order.')
      return
    }

    if (!selectedAddressId) {
      setMessage('❌ Please select a shipping address.')
      return
    }

    try {
      setIsSubmitting(true)

      const orderData = {
        addressId: selectedAddressId,
        paymentMethod,
        items: cartItems,
        userId: user.id,
        totalAmount,
      }

      const res = await axios.post(
        'http://localhost:5000/api/placeOrder',
        orderData
      )

      clearCart()
      setSelectedAddressId('')
      setPaymentMethod('cod')

      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        navigate('/')
      }, 3000)
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

      {!user ? (
        <p>
          <strong>Please Login ❤️</strong>
        </p>
      ) : (
        <>
          <AddressList userId={user.id} />

          <div className="checkout-form">
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
                !selectedAddressId || isSubmitting || cartItems.length === 0
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
        </>
      )}

      {showSuccess && (
        <div className="order-success-overlay">
          <div className="order-success-box">
            <h3>✅ Order Placed Successfully!</h3>
            <p>Redirecting you to the home page...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
