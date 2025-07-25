import { useState, useEffect } from 'react'
import '../../styles/components/user/Payment.css' // Adjust path as needed

const Payment = () => {
  const [paymentOptions, setPaymentOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState('')

  useEffect(() => {
    const mockOptions = [
      'Credit Card',
      'Debit Card',
      'UPI',
      'Cash on Delivery',
      'Net Banking',
    ]
    setPaymentOptions(mockOptions)
  }, [])

  return (
    <div className="payment-wrapper">
      <div className="payment-card">
        <h2>Choose Your Payment Method</h2>

        <label htmlFor="payment-select">Payment Options</label>
        <select
          id="payment-select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">-- Select Payment Option --</option>
          {paymentOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>

        {selectedOption && (
          <div className="payment-info">
            <p>
              You selected: <strong>{selectedOption}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Payment
