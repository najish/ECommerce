import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthModal from './AuthModal'
import Login from './Login'
import Signup from './Signup'
import { useUser } from '../contexts/UserContext'
import { useCart } from '../contexts/CartContext'
import { useSearch } from '../contexts/SearchContext'

import cartIcon from '../assets/cart-icon.jpeg'
import logoImage from '../assets/ecommerce.jpeg'
import searchIcon from '../assets/search-icon.jpeg'

import '../styles/components/Header.css'

export default function Header() {
  const [authModal, setAuthModal] = useState({ open: false, type: '' })
  const { user, setUser } = useUser()
  const { totalQuantity } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const { setSearchProduct } = useSearch()

  const openModal = (type) => setAuthModal({ open: true, type })
  const closeModal = () => setAuthModal({ open: false, type: '' })

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchProduct(searchTerm)
  }

  return (
    <header className="header">
      <div className="nav-left">
        <Link to="/" className="logo-link">
          <img src={logoImage} alt="E-Commerce Logo" className="logo-img" />
        </Link>
      </div>

      <form className="search-product" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="search-button search-button-new"
          aria-label="Search Button"
        >
          <img src={searchIcon} alt="Search" className="search-icon" />
        </button>
      </form>

      <div className="nav-right">
        <Link to="/cart" className="cart-link" aria-label="Cart">
          <img src={cartIcon} alt="Cart Icon" className="cart-icon-img" />
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span>
          )}
        </Link>

        {user ? (
          <>
            <span className="greeting">
              {user.name.split(' ')[0] || 'User'}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="auth-btn" onClick={() => openModal('login')}>
              Login
            </button>
            <button className="auth-btn" onClick={() => openModal('signup')}>
              Signup
            </button>
          </>
        )}
      </div>

      {authModal.open && (
        <div className="center-overlay" onClick={closeModal}>
          <div className="center-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ✖️
            </button>
            {authModal.type === 'login' ? (
              <Login setUser={setUser} closeModal={closeModal} />
            ) : (
              <Signup closeModal={closeModal} />
            )}
          </div>
        </div>
      )}
    </header>
  )
}
