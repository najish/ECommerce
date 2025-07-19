// src/contexts/AppProvider.jsx
import SearchProvider  from './SearchProvider'
import CartProvider from './CartProvider'
import  UserProvider from './UserProvider'
// Add more providers as needed

const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <CartProvider>
        <SearchProvider>{children}</SearchProvider>
      </CartProvider>
    </UserProvider>
  )
}

export default AppProvider
