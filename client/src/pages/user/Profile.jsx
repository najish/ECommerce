import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/pages/user/Profile.css'
import { FaUser } from 'react-icons/fa'
import { FaPenToSquare } from 'react-icons/fa6'
import { Address, AddressList } from '../../components/user'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import Payment from '../../components/user/Payment'

function Profile() {
  const [user, setUser] = useState(null)
  const [image, setImage] = useState(null)
  const [uploadMessage, setUploadMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dropDown, setDropDown] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored)
        setUser(parsedUser)
        setImage(parsedUser.imageUrl || null)
      } catch (err) {
        console.error('User parsing error:', err)
        setError('Invalid user data')
      }
    } else {
      setError('User not found.')
    }
    setLoading(false)
  }, [])

  const handleDropDown = () => {
    setDropDown((prev) => !prev)
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file || !user?.id) return

    const formData = new FormData()
    formData.append('imageUrl', file)
    formData.append('userId', user.id)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/upload-profile`,
        formData
      )
      const imageUrl = response.data.data.imageUrl
      const updatedUser = { ...user, imageUrl }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setImage(imageUrl)
      setUploadMessage('✅ Profile picture uploaded successfully!')
    } catch (err) {
      console.error('Upload failed:', err)
      setUploadMessage('❌ Failed to upload image.')
    }

    setTimeout(() => setUploadMessage(''), 3000)
  }

  if (loading) return <div className="profile-wrapper">Loading profile...</div>
  if (error) return <div className="profile-wrapper error">{error}</div>
  if (!user) return <div className="profile-wrapper">User not found.</div>

  return (
    <div className="profile-wrapper">
      <h2>Your Profile</h2>

      {uploadMessage && (
        <div
          className={`upload-message ${
            uploadMessage.startsWith('✅') ? 'success' : 'error'
          }`}
        >
          {uploadMessage}
        </div>
      )}

      <div className="profile-card">
        <div className="edit-profile-icon">
          <label htmlFor="profileImage" className="upload-label">
            <FaPenToSquare size={24} className="edit-icon" />
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {image ? (
            <img
              src={`${import.meta.env.VITE_API_URL}/${image}`}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <FaUser size={100} className="placeholder-image" />
          )}
        </div>

        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone || 'N/A'}
          </p>
        </div>
      </div>

      <div className="address-container">
        <span onClick={handleDropDown}>
          <strong>Addresses: </strong> <IoIosArrowDropdownCircle />
        </span>
        {dropDown ? <AddressList userId={user.id} /> : <></>}
      </div>
    </div>
  )
}

export default Profile
