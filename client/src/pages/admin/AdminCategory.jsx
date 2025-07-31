import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/pages/admin/AdminCategory.css'
import {Link} from 'react-router-dom'

function AdminCategory() {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories')
      setCategories(res.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load categories')
      setLoading(false)
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`)
      fetchCategories()
    } catch (err) {
      setError('Failed to delete category')
      console.error(err)
    }
  }

  return (
    <div className="admin-category-container">
      <div>

      <h2 className="admin-category-title">Manage Categories</h2>
      <Link to='/add-category'>Add Category</Link>
      </div>

      {error && <p className="category-error">{error}</p>}
      {loading ? (
        <p className="category-message">Loading...</p>
      ) : (
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat._id}>
              {cat.name}
              <button onClick={() => handleDelete(cat._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AdminCategory
