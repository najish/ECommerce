import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/components/user/ProfileDropDown.css'
import { FaUser } from 'react-icons/fa'

const ProfileDropdown = ({ handleLogout }) => {
  const [user, setUser] = useState(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setImage(parsedUser.imageUrl || null)
      } catch (err) {
        console.error('Error parsing user from localStorage:', err)
      }
    }
  }, [])

  return (
    <div className="profile-dropdown">
      <div className="profile-trigger">
        {image ? (
          <img
            src={`${import.meta.env.VITE_API_URL}/${image}`}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <FaUser size={30} className="placeholder-icon" />
        )}
      </div>

      <ul className="dropdown-menu">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  )
}

export default ProfileDropdown
