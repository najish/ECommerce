import React, { useState } from 'react'
import '../../styles/pages/user/Profile.css' // Reuse existing modal styles

const AddAddressModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    street: '',
    city: '',
    district: '',
    state: '',
    country: '',
    pincode: '',
    landmark: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !form.street ||
      !form.city ||
      !form.state ||
      !form.country ||
      !form.pincode
    ) {
      alert('Please fill all required fields.')
      return
    }
    onSave(form)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>Add New Address</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={form.street}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="landmark"
            placeholder="Landmark (Optional)"
            value={form.landmark}
            onChange={handleChange}
          />

          <button type="submit" className="add-address-btn">
            Save Address
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddAddressModal
