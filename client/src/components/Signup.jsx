import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/components/Login.css' // ✅ Shared auth styles
import { useUser } from '../contexts/UserContext'

const Signup = ({ closeModal }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useUser()

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match!')
      return
    }

    try {
      setLoading(true)

      console.log('Signing up with:', form)

      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        {
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }
      )

      console.log('Signup response:', response.data)

      // Example: Assume API returns { user: { name, email } }
      setUser(response.data.user)
      closeModal()

      navigate('/') // ✅ Redirect to home page
    } catch (err) {
      console.error('Signup error:', err)
      setError(
        err.response?.data?.message || 'Signup failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="signup-name">Name:</label>
          <input
            type="text"
            name="name"
            id="signup-name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-email">Email:</label>
          <input
            type="email"
            name="email"
            id="signup-email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-password">Password:</label>
          <input
            type="password"
            name="password"
            id="signup-password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="signup-confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Signup
