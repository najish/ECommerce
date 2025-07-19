import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/pages/user/Profile.css'

function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      try {
        const parsedUser = JSON.parse(data)
        setUser(parsedUser)
      } catch (err) {
        console.error('Error parsing user data from localStorage:', err)
        setError('Invalid user data found.')
      }
    } else {
      setError('User not found.')
    }
    setLoading(false)
  }, [])

  if (loading) return <div className="profile-wrapper">Loading profile...</div>
  if (error) return <div className="profile-wrapper error">{error}</div>
  if (!user) return <div className="profile-wrapper">User not found.</div>

  return (
    <div className="profile-wrapper">
      <h2>Your Profile</h2>
      <div className="profile-card">
        <img
          src={user.profilePic || '/default-avatar.png'}
          alt="User"
          className="profile-image"
        />
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone || 'N/A'}
          </p>
          <p>
            <strong>Address:</strong> {user.address || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
