import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../../styles/pages/admin/AddProduct.css'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_API_URL

export default function AddProduct() {
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
  })

  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/categories`)
        setCategories(res.data)
      } catch (error) {
        setMessage('Failed to fetch categories.')
        console.error(error)
      }
    }
    fetchCategories()
  }, [])

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setShowSuccess(false)

    const formData = new FormData()
    for (const key in product) {
      formData.append(key, product[key])
    }
    if (image) formData.append('imageUrl', image)

    try {
      const res = await axios.post(`${BASE_URL}/api/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (res.status !== 201) {
        console.log('failed to add the product')
      }

      // Reset form
      setProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: '',
      })
      setImage(null)
      setImagePreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = null
      }

      setShowSuccess(true)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      setMessage('🎉 Product added successfully! Congrats!')
      navigate('/admin')
    } catch (error) {
      setMessage('❌ Failed to add product.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <h2 className="add-product-title">Add Product</h2>

        {loading && (
          <div className="spinner">
            <Spinner />
          </div>
        )}

        {message && (
          <p
            className={`add-product-message ${
              showSuccess ? 'success' : 'error'
            }`}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="add-product-form"
        >
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            )}
          </div>

          <div className="form-group">
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
