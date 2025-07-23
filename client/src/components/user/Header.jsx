import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthModal from './AuthModal'
import Login from './Login'
import Signup from './Signup'
import { useUser } from '../../contexts/UserContext'
import { useCart } from '../../contexts/CartContext'
import { useSearch } from '../../contexts/SearchContext'
import { BsBagHeart, BsSearch } from 'react-icons/bs'
import logoImage from '../../assets/ecommerce.jpeg'
import ProfileDropdown from './ProfileDropDown'

import '../../styles/components/user/Header.css'

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
          <BsSearch size={20} />
        </button>
      </form>

      <div className="nav-right">
        <Link to="/cart" className="cart-link" aria-label="Cart">
          <BsBagHeart size={30} />
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span>
          )}
        </Link>

        {user ? (
          <>
            <ProfileDropdown user={logoImage} handleLogout={handleLogout} />
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
