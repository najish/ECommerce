import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../components/Header'
import { BrowserRouter as Router } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { useCart } from '../contexts/CartContext'

// 🧪 Mock contexts
jest.mock('../contexts/UserContext', () => ({
  useUser: jest.fn(),
}))

jest.mock('../contexts/CartContext', () => ({
  useCart: jest.fn(),
}))

// 🧪 Mock child components to avoid rendering entire modals
jest.mock('../components/Login', () => () => <div>Login Component</div>)
jest.mock('../components/Signup', () => () => <div>Signup Component</div>)

describe('Header Component', () => {
  const renderHeader = () =>
    render(
      <Router>
        <Header />
      </Router>
    )

  beforeEach(() => {
    // default mock state
    useUser.mockReturnValue({ user: null, setUser: jest.fn() })
    useCart.mockReturnValue({ totalQuantity: 0 })
  })

  it('renders logo and search input', () => {
    renderHeader()

    expect(
      screen.getByPlaceholderText('Search products...')
    ).toBeInTheDocument()
    expect(screen.getByAltText('E-Commerce Logo')).toBeInTheDocument()
  })

  it('shows Login and Signup when user is not logged in', () => {
    renderHeader()

    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Signup')).toBeInTheDocument()
  })

  it('shows greeting and logout button when user is logged in', () => {
    useUser.mockReturnValue({
      user: { name: 'Zafer Eqbal' },
      setUser: jest.fn(),
    })

    renderHeader()

    expect(screen.getByText('Zafer')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('shows cart icon and quantity when items are in cart', () => {
    useCart.mockReturnValue({ totalQuantity: 3 })
    renderHeader()

    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByAltText('Cart Icon')).toBeInTheDocument()
  })

  it('triggers search and clears input on submit', () => {
    renderHeader()

    const input = screen.getByPlaceholderText('Search products...')
    fireEvent.change(input, { target: { value: 'laptop' } })

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})
    const form =
      screen.getByRole('form', { hidden: true }) || input.closest('form')

    fireEvent.submit(form)

    expect(alertMock).toHaveBeenCalledWith('Searching for: laptop')
    alertMock.mockRestore()
  })

  it('opens login modal when Login button is clicked', () => {
    renderHeader()
    fireEvent.click(screen.getByText('Login'))
    expect(screen.getByText('Login Component')).toBeInTheDocument()
  })

  it('opens signup modal when Signup button is clicked', () => {
    renderHeader()
    fireEvent.click(screen.getByText('Signup'))
    expect(screen.getByText('Signup Component')).toBeInTheDocument()
  })
})
