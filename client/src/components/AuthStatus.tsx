import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function AuthStatus() {
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

export default AuthStatus
