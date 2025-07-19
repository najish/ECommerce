// src/components/AuthModal.jsx
import React from 'react'

export default function AuthModal({ type, onClose, setUser }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('user', 'DemoUser')
    setUser('DemoUser')
    onClose()
  }

  return (
    <>
      {type === 'login' && (
        <>
          <h2>Login</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </>
      )}

      {type === 'signup' && (
        <>
          <h2>Sign Up</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </>
      )}
    </>
  )
}
