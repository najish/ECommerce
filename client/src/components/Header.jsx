import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import Login from './Login';
import Signup from './Signup';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';

import cartIcon from '../assets/cart-icon.jpeg';
import logoImage from '../assets/ecommerce.jpeg';

import '../styles/components/Header.css';

export default function Header() {
  const [authModal, setAuthModal] = useState({ open: false, type: '' });
  const { user, setUser } = useUser();
  const { totalQuantity } = useCart();

  const openModal = (type) => setAuthModal({ open: true, type });
  const closeModal = () => setAuthModal({ open: false, type: '' });

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <header className="header">
      <div className="nav-left">
        <Link to="/" className="logo-link">
          <img src={logoImage} alt="MyShop Logo" className="logo-img" />
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>

      <div className="nav-right">
        <Link to="/cart" className="cart-link">
          <img src={cartIcon} alt="Cart" className="cart-icon-img" />
          {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
        </Link>

        {user ? (
          <>
            <span className="greeting">Hi, {user.username || 'User'}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="auth-btn" onClick={() => openModal('login')}>Login</button>
            <button className="auth-btn" onClick={() => openModal('signup')}>Signup</button>
          </>
        )}
      </div>

      {authModal.open && (
        <div className="center-overlay" onClick={closeModal}>
          <div className="center-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✖️</button>
            {authModal.type === 'login' ? (
              <Login setUser={setUser} closeModal={closeModal} />
            ) : (
              <Signup setUser={setUser} closeModal={closeModal} />
            )}
          </div>
        </div>
      )}
    </header>
  );
}
