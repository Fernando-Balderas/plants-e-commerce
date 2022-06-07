import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function PrivateRoute({ children, ...rest }: any) {
  const auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.authed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
