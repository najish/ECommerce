import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/pages/Checkout.css';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, totalQuantity, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    try {
      const orderData = {
        address,
        paymentMethod,
        items: cartItems,
      };

      const res = await axios.post('/api/orders', orderData); // Express backend
      setMessage('Order placed successfully!');
      clearCart();
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Try again.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-form">
        <label>Shipping Address:</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="cod">Cash on Delivery</option>
          <option value="card">Card (Demo)</option>
          <option value="card">UPI</option>
          <option value="card">QR CODE</option>
        </select>

        <button onClick={handleCheckout}>Place Order</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Checkout;
