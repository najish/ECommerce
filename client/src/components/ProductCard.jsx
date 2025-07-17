import React from 'react';
import '../styles/components/ProductCard.css';
import productImage from '../assets/product.jpeg';

const images = {
  'product.jpeg': productImage
};
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={images['product.jpeg']}
        alt={product.title}
        className="product-image"
      />
      <div className="product-details">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p
          className={`product-stock ${
            product.inStock ? 'in-stock' : 'out-of-stock'
          }`}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </p>

        <div className="product-actions">
          <button className="btn add-to-cart" disabled={!product.inStock}>
            Add to Cart
          </button>
          <button className="btn buy-now" disabled={!product.inStock}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
