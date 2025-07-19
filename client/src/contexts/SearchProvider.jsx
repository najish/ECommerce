// src/contexts/SearchProvider.jsx
import { useState } from 'react'
import SearchContext from './SearchContext'

const SearchProvider = ({ children }) => {
  const [searchProduct, setSearchProduct] = useState('')

  return (
    <SearchContext.Provider value={{ searchProduct, setSearchProduct }}>
      {children}
    </SearchContext.Provider>
  )
}
export default SearchProvider
