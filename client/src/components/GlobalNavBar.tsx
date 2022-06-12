import React from 'react'
import { Link } from 'react-router-dom'

import Can from '../helpers/Can'
import AuthStatus from './AuthStatus'

function GlobalNavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <Can
          perform="orders"
          yes={() => (
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          )}
        />
        <Can
          perform="users"
          yes={() => (
            <li>
              <Link to="/users">Users</Link>
            </li>
          )}
        />
        <li>
          <AuthStatus />
        </li>
      </ul>
    </nav>
  )
}

export default GlobalNavBar
