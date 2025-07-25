// src/contexts/AppProvider.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SearchProvider from './SearchProvider'
import CartProvider from './CartProvider'
import UserProvider from './UserProvider'

// Create a single instance of QueryClient
const queryClient = new QueryClient()

const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <SearchProvider>{children}</SearchProvider>
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
