import React, { useState, useEffect } from 'react'
import '../../styles/pages/admin/AdminUser.css'
import axios from 'axios'

function AdminUser() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users')
        setUsers(response.data)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch users')
        setLoading(false)
        console.error(error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="admin-user-container">
      <h2 className="admin-user-title">Users</h2>
      {loading ? (
        <p className="admin-user-message">Loading...</p>
      ) : error ? (
        <p className="admin-user-error">{error}</p>
      ) : (
        <table className="admin-user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role || 'User'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminUser
