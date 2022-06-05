import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

type RequireAuthProps = {
  children: JSX.Element
}

function RequireAuth({ children }: RequireAuthProps) {
  const { authed } = useAuth()
  const location = useLocation()

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  )
}

export default RequireAuth
