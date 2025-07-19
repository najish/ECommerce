import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/pages/ChangePassword.css' // CSS file for styling
import axios from 'axios'
function ChangePassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const token = localStorage.getItem('token')

    if (!token) {
      console.log('token is not availabe')
      return
    }
    const data = {
      password,
      confirmPassword,
      token,
    }
    console.log(data)

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/change-password',
        data
      )

      if (response.status === 200) {
        setSuccess('Password changed successfully!')
        setPassword('')
        setConfirmPassword('')
        alert('Password has been changed. You can now login Thank You.')
        navigate('/')
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="change-password-container">
      <form className="change-password-form" onSubmit={handleSubmit}>
        <h2>Change Password</h2>

        {error && <div className="message error">{error}</div>}
        {success && <div className="message success">{success}</div>}

        <label>New Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  )
}

export default ChangePassword
