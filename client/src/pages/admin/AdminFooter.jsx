import React from 'react'
import '../../styles/pages/admin/AdminFooter.css'

function AdminFooter() {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-content">
        <p>
          &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
        </p>
        <div className="admin-footer-links">
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/products">Products</a>
          <a href="/admin/orders">Orders</a>
        </div>
      </div>
    </footer>
  )
}

export default AdminFooter
