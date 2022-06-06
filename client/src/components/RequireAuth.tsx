export {}
// import React from 'react'
// import { useHistory, useLocation } from 'react-router-dom'
// import useAuth from '../hooks/useAuth'

// type RequireAuthProps = {
//   children: JSX.Element
// }

// function RequireAuth({ children }: RequireAuthProps) {
//   const { authed } = useAuth()
//   const location = useLocation()
//   const history = useHistory()

//   return authed === true
//     ? children
//     : // <Navigate to="/login" replace state={{ path: location.pathname }} />
//       history.push('/login', { path: location.pathname })
// }

// export default RequireAuth
