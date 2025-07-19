import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../styles/pages/admin/AdminProduct.css'

function AdminProduct() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products')
      setProducts(res.data)
    } catch (err) {
      console.error('Error fetching products:', err)
    }
  }

  return (
    <div className="admin-product-container">
      <div className="admin-product-header">
        <h2>Products</h2>
        <Link to="/admin/products/add" className="add-product-btn">
          + Add Product
        </Link>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6">No products found.</td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.image || '/placeholder.png'}
                    alt={product.name}
                    className="product-img"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AdminProduct
