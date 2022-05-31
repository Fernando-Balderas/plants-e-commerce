import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      {/* <GlobalNavBar /> */}
      <Outlet />
      {/* <GlobalFooter /> */}
    </>
  )
}

export default App
