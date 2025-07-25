// src/components/AddressList.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/components/user/AddressList.css'

const AddressList = ({ userId }) => {
  const [addressList, setAddressList] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        console.log('addresslist')
        const response = await axios.get(
          `http://localhost:5000/api/address/${userId}`
        )
        if (response.data.length > 0) {
          setAddressList(response.data)
          setSelectedId(response.data[0].id) // ✅ Default selection
        }
      } catch (error) {
        console.error('Failed to fetch addresses:', error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchAddresses()
    }
  }, [userId])

  return (
    <div className="address-list-container">
      <h2>Select Shipping Address</h2>

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
                className={`address-card ${
                  selectedId === address.id ? 'selected' : ''
                }`}
                onClick={() => setSelectedId(address.id)}
              >
                <p>
                  <strong>{address.name}</strong>
                </p>
                <p>
                  {address.street}, {address.city}
                </p>
                <p>
                  {address.state} - {address.zip}
                </p>
                <p>📞 {address.phone}</p>
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
