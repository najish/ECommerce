import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/pages/admin/AdminSidebar.css'

function AdminSidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active-link' : 'sidebar-link'
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active-link' : 'sidebar-link'
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active-link' : 'sidebar-link'
              }
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active-link' : 'sidebar-link'
              }
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active-link' : 'sidebar-link'
              }
            >
              Users
            </NavLink>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/admin/login"
                  className={({ isActive }) =>
                    isActive ? 'sidebar-link active-link' : 'sidebar-link'
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/signup"
                  className={({ isActive }) =>
                    isActive ? 'sidebar-link active-link' : 'sidebar-link'
                  }
                >
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/admin/logout"
                  className={({ isActive }) =>
                    isActive ? 'sidebar-link active-link' : 'sidebar-link'
                  }
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default AdminSidebar
