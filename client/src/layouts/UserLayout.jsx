import Header from '../components/user/Header'
import Footer from '../components/user/Footer'
import Container from '../components/user/Container'
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
