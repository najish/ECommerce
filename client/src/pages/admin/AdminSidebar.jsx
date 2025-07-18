import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/pages/admin/AdminSidebar.css'

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/products">Products</Link>
            </li>
            <li>
              <Link to="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link to="/admin/users">Users</Link>
            </li>
            <li>
              <Link to="/admin/login">Login</Link>
            </li>
            <li>
              <Link to="/admin/signup">Signup</Link>
            </li>
            <li>
              <Link to="/admin/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}

export default Dashboard
