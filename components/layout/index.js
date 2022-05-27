import Navbar from '../navbar'
import Container from './container'

const Layout = ({ children }) => {
  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  )
}

export default Layout
