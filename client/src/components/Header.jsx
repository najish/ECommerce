import React, { useEffect, useState } from 'react';
import AuthModal from './AuthModal';
import Login from './Login';
import Signup from './Signup';
import '../styles/components/Header.css';
import { Link } from 'react-router-dom';
import {useUser} from '../contexts/UserContext'

export default function Header() {

  const [authModal, setAuthModal] = useState({ open: false, type: '' });
  const {user, setUser} = useUser()

  useEffect(() => {
    
  }, []);

  const openModal = (type) => {
    setAuthModal({ open: true, type });
  };

  const closeModal = () => {
    setAuthModal({ open: false, type: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="header">
      <ul className="nav-left">
        <li>
          <Link to="/">
            <img src="/src/assets/ecommerce.jpeg" alt="icon" className="logo" />
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      {user ? (
        <ul className="nav-right">
          <li>Hello, {user.username || 'User'}!</li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul className="nav-right">
          <li>
            <button className="auth-btn" onClick={() => openModal('login')}>
              Login
            </button>
          </li>
          <li>
            <button className="auth-btn" onClick={() => openModal('signup')}>
              Signup
            </button>
          </li>
        </ul>
      )}

      {authModal.open && (
        <div className="center-overlay" onClick={closeModal}>
          <div className="center-box" onClick={(e) => e.stopPropagation()}>
            <div className="parent-close-btn">
              <button className="close-btn" onClick={closeModal}>
                ✖️
              </button>
            </div>

            {authModal.type === 'login' ? (
              <Login setUser={setUser} closeModal={closeModal} />
            ) : (
              <Signup setUser={setUser} closeModal={closeModal} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
