import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/components/user/ProfileDropDown.css'
import { FaUser } from 'react-icons/fa'
const ProfileDropdown = ({ handleLogout }) => {
  return (
    <div className="profile-dropdown">
      <div className="profile-trigger">
        <FaUser size={30} />
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
          <button onClick={() => handleLogout()}>Logout</button>
        </li>
      </ul>
    </div>
  )
}

export default ProfileDropdown
