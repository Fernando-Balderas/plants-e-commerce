import React from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

function LogIn() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = () => {
    login().then(() => {
      navigate('/')
    })
  }

  return (
    <>
      <h1>LogIn page</h1>
      <button onClick={handleLogin}>Log in</button>
    </>
  )
}
// "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
export default LogIn
