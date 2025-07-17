import products from '../data/products.json'
import ProductCard from '../components/ProductCard'
const Products = () => {


  return (
    <div>
      <h1>Products</h1>
      {products.map(product => (<ProductCard key={product.id} product={product} />))}
    </div>
  )
}

export default Products
