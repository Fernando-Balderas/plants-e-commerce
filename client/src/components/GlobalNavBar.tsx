import React from 'react'
import { Link } from 'react-router-dom'
import AuthStatus from './AuthStatus'

function GlobalNavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <AuthStatus />
        </li>
      </ul>
    </nav>
  )
}

export default GlobalNavBar
