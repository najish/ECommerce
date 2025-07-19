import Header from '../components/Header'
import Footer from '../components/Footer'
import Container from '../components/Container'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet /> {/* nested user routes render here */}
      </Container>
      <Footer />
    </>
  )
}

export default UserLayout
