import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/pages/admin/AdminHeader.css'

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <Link to="/admin" className="admin-header-title">
        Admin Dashboard
      </Link>
    </header>
  )
}

export default AdminHeader
