import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import '../../styles/components/user/Address.css'
import { IoIosCloseCircle } from 'react-icons/io'

function Address({ userId }) {
  const [formData, setFormData] = useState({
    landmark: '',
    street: '',
    city: '',
    district: '',
    state: '',
    country: '',
    pincode: '',
  })
  const [isClosed, setIsClosed] = useState(true)
  const queryClient = useQueryClient()

  const fetchAddresses = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/address/${userId}`
    )
    return response.data
  }

  const {
    data: addressList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['address', userId],
    queryFn: fetchAddresses,
    enabled: !!userId,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:5000/api/address', {
        userId,
        ...formData,
      })
      setFormData({
        landmark: '',
        street: '',
        city: '',
        district: '',
        state: '',
        country: '',
        pincode: '',
      })
      setIsClosed(true)
      queryClient.invalidateQueries(['address', userId]) // Refetch addresses
    } catch (error) {
      console.error('Error adding address:', error)
    }
  }

  const handleAddAddress = () => {
    setIsClosed((prev) => !prev)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="address-body">
        <div className="address-header">
          <h3>Shipping Addresses</h3>
          <a onClick={handleAddAddress} className="add-address-link">
            {isClosed ? 'Add New Shipping Address' : 'Close Form'}
          </a>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching addresses.</p>
        ) : addressList.length === 0 ? (
          <div>
            <span>Address is not available</span>
          </div>
        ) : (
          <div className="address-list">
            {addressList.map((address) => (
              <div key={address.id} className="address-card">
                <p>
                  <strong>Street : </strong>
                  {address.street}
                </p>
                <p>
                  <span>
                    <strong>City :</strong>
                    {address.city}
                  </span>
                </p>
                <p>
                  <strong>District : </strong>
                  {address.district}
                </p>
                <p>
                  <strong>State:</strong>
                  {address.state}
                </p>
                <p>
                  <strong>Country: </strong>
                  {address.country}
                </p>
                <p>
                  <strong>Pincode:</strong>
                  {address.pincode}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isClosed && (
        <>
          <div className="address-overlay"></div>
          <div className="address-form">
            <h2>Enter Address</h2>
            <span onClick={handleAddAddress} className="close-icon-wrapper">
              <IoIosCloseCircle className="close-icon" size={30} />
            </span>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />

              <button type="submit">Add Address</button>
            </form>
          </div>
        </>
      )}
    </>
  )
}

export default Address
