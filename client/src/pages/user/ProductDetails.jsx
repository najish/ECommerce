import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../../contexts/CartContext'
import '../../styles/pages/user/ProductDetails.css'
import productImage from '../../assets/product.jpeg'

const BASE_URL = import.meta.env.VITE_API_URL

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/${id}`)
        setProduct(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch product:', error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <div className="loading">Loading...</div>
  if (!product) return <div className="error">Product not found.</div>

  const handleAddToCart = () => {
    addToCart(product)
  }

  const imageUrl = product.imageUrl
    ? `${BASE_URL}/${product.imageUrl}`
    : productImage

  return (
    <div className="product-details-container">
      <img src={imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>
        <p>Stock: {product.stock > 0 ? product.stock : 'Out of stock'}</p>
        <p>Category: {product.category?.name}</p>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="add-to-cart-btn"
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
