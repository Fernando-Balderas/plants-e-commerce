import React from 'react'
import GlobalNavBar from './components/GlobalNavBar'
import Routes from './Routes'
// import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <GlobalNavBar />
      <Routes />
      {/* <Outlet /> */}
      {/* <GlobalFooter /> */}
    </>
  )
}

export default App
