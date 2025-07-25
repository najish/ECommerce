import '../../styles/components/user/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../../contexts/UserContext'
import {GoogleLogin} from '../user'
const Login = ({ closeModal }) => {
  const { setUser, setToken } = useUser()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

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
    setLoading(true)

    try {
      console.log('Logging in with:', form)

      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        form
      )

      console.log('Server response:', response.data)

      const { token, data } = response.data

      if (token) {
        const user = {
          id: data.id,
          email: data.email,
          name: data.name,
          imageUrl: data.imageUrl,
        }
        setUser(user)
        setToken(token)

        closeModal()
        navigate('/')
      } else {
        setError('No token received.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(
        err.response?.data?.message ||
          'Login failed. Please check your credentials.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleForget = () => {
    closeModal()
    navigate('/forgot-password')
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            name="email"
            id="login-email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            name="password"
            id="login-password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="form-footer">
          <span className="forgot-password" onClick={handleForget}>
            Forgot Password?
          </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <GoogleLogin closeModal={closeModal}/>
      </form>
    </div>
  )
}

export default Login
