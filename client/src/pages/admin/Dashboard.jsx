import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/pages/admin/Dashboard.css'

function Dashboard() {
  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <h3>Welcome, Admin</h3>
      </header>

      <section className="dashboard-stats">
        <div className="stat-card">
          <Link to="/admin/products">
            <span>📦 Products:</span>
            <span>120</span>
          </Link>
        </div>
        <div className="stat-card">
          <Link to="/admin/orders">
            🛒 Orders: <span>78</span>
          </Link>
        </div>
        <div className="stat-card">
          <Link to="/admin/users">
            👥 Users: <span>45</span>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Dashboard
