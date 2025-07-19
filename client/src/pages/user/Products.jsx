import { useEffect, useState } from 'react'
import { ProductCard } from '../../components/user'
import '../../styles/pages/user/Products.css'
import { useSearch } from '../../contexts/SearchContext'
import axios from 'axios'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { searchProduct } = useSearch()

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products')
        const data = res.data

        // Filter logic
        if (searchProduct && searchProduct.trim() !== '') {
          const query = searchProduct.toLowerCase().trim()
          const words = query.split(' ')
          const filtered = data.filter((product) =>
            words.some((word) => product.name.toLowerCase().includes(word))
          )
          setFilteredProducts(filtered)
        } else {
          setFilteredProducts(data)
        }

        setProducts(data)
        setCurrentPage(1) // Reset to page 1 on data reload
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchProduct])

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const goToPage = (page) => setCurrentPage(page)
  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const goToNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  if (loading) return <p className="loading-text">Loading products...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div className="products-container">
      <div className="products-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={goToPrev} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={goToNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Products
