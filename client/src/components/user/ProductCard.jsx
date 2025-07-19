import React from 'react'
import '../../styles/components/user/ProductCard.css'
import productImage from '../../assets/product.jpeg'
import { useCart } from '../../contexts/CartContext'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const imageUrl = product.imageUrl
    ? `http://localhost:5000/${product.imageUrl}`
    : productImage

  return (
    <div className="product-card">
      <li>
        <Link to={`/products/${product.id}`}>
          <img src={imageUrl} alt={product.name} className="product-image" />
        </Link>
      </li>
      <div className="product-details">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${Number(product.price).toFixed(2)}</p>
        <p
          className={`product-stock ${
            product.stock > 0 ? 'in-stock' : 'out-of-stock'
          }`}
        >
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>

        <div className="product-actions">
          <button
            className="btn add-to-cart"
            disabled={product.stock <= 0}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button className="btn buy-now" disabled={product.stock <= 0}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
