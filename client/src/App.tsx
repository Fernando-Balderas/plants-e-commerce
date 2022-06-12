import React from 'react'
import GlobalNavBar from './components/GlobalNavBar'
import Routes from './routes/Routes'
import Cart from './features/cart/Cart'

function App() {
  return (
    <>
      <GlobalNavBar />
      <Cart />
      <Routes />
      {/* <GlobalFooter /> */}
    </>
  )
}

export default App
