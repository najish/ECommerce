import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'

import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Account from './pages/Account'
import About from './pages/About'
import Checkout from './pages/Checkout'

import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import AdminSignup from './pages/admin/AdminSignup'
import AdminProduct from './pages/admin/AdminProduct'
import AddProduct from './pages/admin/AddProduct'
import AdminNotFound from './pages/admin/AdminNotFound'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* USER ROUTES with layout */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} /> {/* 👈 this is the fix */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="signup" element={<AdminSignup />} />
            <Route path="products">
              <Route index element={<AdminProduct />} />
              <Route path="add" element={<AddProduct />} />
            </Route>
            <Route path="*" element={<AdminNotFound />} />
            <Route />
            {/* Add more admin routes here */}
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
