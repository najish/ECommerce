import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Account from './pages/Account';
import Footer from './components/Footer';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Container from './components/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header /> {/* stays on all pages */}
        <Container>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
