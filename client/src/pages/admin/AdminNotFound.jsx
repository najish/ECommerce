import React from 'react'
import '../../styles/pages/admin/AdminNotFound.css'

function AdminNotFound() {
  return (
    <div className="admin-not-found">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <a href="/admin" className="admin-not-found-link">
        Go back to Dashboard
      </a>
    </div>
  )
}

export default AdminNotFound
