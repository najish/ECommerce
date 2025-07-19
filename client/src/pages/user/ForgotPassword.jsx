import React, { useState } from 'react'
import axios from 'axios'
import '../../styles/pages/user/ForgotPassword.css'
import { useNavigate } from 'react-router-dom'
const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [otpValue, setOtpValue] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const navigate = useNavigate()

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        { email }
      )
      localStorage.setItem('token', response.data.token)
      setMessage('Reset OTP sent to your email.')
      setShowOtp(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      setMessage('')

      const token = localStorage.getItem('token')
      if (!token) {
        console.log('token is not available')
        setError('wrong email')
      } else {
        const response = await axios.post(
          'http://localhost:5000/api/auth/verify-otp',
          {
            email,
            otp: otpValue,
            token,
          }
        )
        if (response.status === 200) {
          setMessage('OTP verified! You can now reset your password.')
          navigate('/change-password')
        }
      }
      // Optionally redirect to reset-password page
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="forgot-container">
      {!showOtp ? (
        <form className="forgot-form" onSubmit={handleEmailSubmit}>
          <h2>Forgot Password</h2>
          {message && <div className="form-success">{message}</div>}
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form className="forgot-form" onSubmit={handleOtpSubmit}>
          <h2>Enter OTP</h2>
          {message && <div className="form-success">{message}</div>}
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="otp">OTP:</label>
            <input
              type="number"
              id="otp"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              required
              placeholder="Enter the 6-digit OTP"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}
    </div>
  )
}

export default ForgetPassword
