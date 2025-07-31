import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/pages/admin/Dashboard.css'
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];


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

      <section className='analytics-section'>
        <div className='chart'>
           <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
              <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>Orders</div>
        <div>Customer</div>
      </section>
    </main>
  )
}

export default Dashboard
