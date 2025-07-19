import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/components/user/ProfileDropDown.css'

const ProfileDropdown = ({ user }) => {
  return (
    <div className="profile-dropdown">
      <div className="profile-trigger">
        <img
          src={user?.profilePic || '/default-avatar.png'}
          alt="Profile"
          className="profile-pic"
        />
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
          <button onClick={() => console.log('Logout logic here')}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ProfileDropdown
