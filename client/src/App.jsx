import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'
// imports related to users
import {
  Products,
  ProductDetails,
  Cart,
  Orders,
  Account,
  About,
  Checkout,
  Profile,
  ForgotPassword,
  ChangePassword,
  Settings,
} from './pages/user'

// imports related to admin
import {
  AdminLogin,
  Dashboard,
  AdminSignup,
  AdminProduct,
  AdminNotFound,
  AddProduct,
  AdminCategory,
  AddCategory,
  AdminUser,
  AdminOrders,
} from './pages/admin'
import { Spinner } from './components/user'

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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/test" element={<Spinner />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} /> 👈 this is the fix
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="signup" element={<AdminSignup />} />
            <Route path="products">
              <Route index element={<AdminProduct />} />
              <Route path="add" element={<AddProduct />} />
            </Route>
            <Route path="categories">
              <Route index element={<AdminCategory />} />
              <Route path="add" element={<AddCategory />} />
            </Route>
            <Route path="users">
              <Route index element={<AdminUser />} />
            </Route>
            <Route path="orders">
              <Route index element={<AdminOrders />} />
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
