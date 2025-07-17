import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProvider from './contexts/UserProvider'
import CartProvider from './contexts/CartProvider'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
      <App />
      </CartProvider>
    </UserProvider>
  </StrictMode>
)
