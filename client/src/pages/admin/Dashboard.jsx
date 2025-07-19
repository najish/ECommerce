import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/pages/admin/Dashboard.css'

function Dashboard() {
  return (
    <div>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome, Admin</h1>
        </header>

        <section className="dashboard-stats">
          <div className="stat-card">
            📦 Products: <span>120</span>
          </div>
          <div className="stat-card">
            🛒 Orders: <span>78</span>
          </div>
          <div className="stat-card">
            👥 Users: <span>45</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
