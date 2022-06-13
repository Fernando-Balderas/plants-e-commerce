import Container from 'react-bootstrap/Container'

import GlobalNavBar from './components/GlobalNavBar'
import Routes from './routes/Routes'
import Cart from './features/cart/Cart'
import GlobalFooter from './components/GlobalFooter'

function App() {
  return (
    <>
      <GlobalNavBar />
      <Cart />
      <Container fluid>
        <Routes />
      </Container>
      <GlobalFooter />
    </>
  )
}

export default App
