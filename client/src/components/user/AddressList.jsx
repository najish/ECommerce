import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/components/user/AddressList.css'

const AddressList = ({ userId }) => {
  const [addressList, setAddressList] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAddress, setNewAddress] = useState({
    street: '',
    landmark: '',
    city: '',
    district: '',
    state: '',
    country: '',
    pincode: ''
  })

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/address/${userId}`)
      if (response.data.length > 0) {
        setAddressList(response.data)
        setSelectedId(response.data[0].id)
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchAddresses()
    }
  }, [userId])

  const handleAddAddress = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/address', {
        ...newAddress,
        userId
      })
      setNewAddress({
        street: '',
        landmark: '',
        city: '',
        district: '',
        state: '',
        country: '',
        pincode: ''
      })
      setShowAddForm(false)
      fetchAddresses()
    } catch (error) {
      console.error('Error adding address:', error)
    }
  }

  return (
    <div className="address-list-container">
      <h2>Select Shipping Address</h2>

      <button className="add-address-btn" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel' : '➕ Add New Address'}
      </button>

      {showAddForm && (
        <form className="add-address-form" onSubmit={handleAddAddress}>
          <input type="text" placeholder="Street" required value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} />
          <input type="text" placeholder="Landmark" value={newAddress.landmark} onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })} />
          <input type="text" placeholder="City" required value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
          <input type="text" placeholder="District" required value={newAddress.district} onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })} />
          <input type="text" placeholder="State" required value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} />
          <input type="text" placeholder="Country" required value={newAddress.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} />
          <input type="text" placeholder="Pincode" required value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} />
          <button type="submit">Save Address</button>
        </form>
      )}

      {loading ? (
        <p>Loading addresses...</p>
      ) : addressList.length === 0 ? (
        <p>No addresses found. Please add one.</p>
      ) : (
        <>
          <div className="address-list">
            {addressList.map((address) => (
              <div
                key={address.id}
                className={`address-card ${selectedId === address.id ? 'selected' : ''}`}
                onClick={() => setSelectedId(address.id)}
              >
                <p><strong>{address.street}</strong></p>
                {address.landmark && <p>{address.landmark}</p>}
                <p>{address.city}, {address.district}</p>
                <p>{address.state}, {address.country} - {address.pincode}</p>
              </div>
            ))}
          </div>

          <p className="selected-msg">
            ✅ Selected Address ID: <strong>{selectedId}</strong>
          </p>
        </>
      )}
    </div>
  )
}

export default AddressList
