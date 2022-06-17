import { useHistory } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { TbTree } from 'react-icons/tb'

import UserOptions from './UserOptions'

function GlobalNavBar() {
  const history = useHistory()

  return (
    <Navbar sticky="top" bg="dark" variant="dark" aria-label="Main menu">
      <Container>
        <Navbar.Brand
          as={Navbar.Text}
          onClick={() => history.push('/')}
          className="nav-brand"
          aria-label="Home page"
        >
          <TbTree size="1.6em" /> Plants E-Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="me-auto">
            <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => history.push('/products')}>
              Products
            </Nav.Link>
          </Nav>
          <Nav>
            <UserOptions />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default GlobalNavBar
