import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import Routes from './Routes'
// import { Outlet } from 'react-router-dom'

export function AuthButton() {
  let history = useHistory()
  let auth = useAuth()

  return auth.authed ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          auth.logout().then(() => history.push('/'))
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>
      You are not logged in. <Link to="/login">Login</Link>
    </p>
  )
}

function App() {
  return (
    <>
      {/* <GlobalNavBar /> */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <AuthButton />
        </li>
      </ul>
      <Routes />
      {/* <Outlet /> */}
      {/* <GlobalFooter /> */}
    </>
  )
}

export default App
