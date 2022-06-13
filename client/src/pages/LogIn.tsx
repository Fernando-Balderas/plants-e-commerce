import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

import axios from '../helpers/axios/instance'
import useAuth from '../hooks/useAuth'
import { LocationState } from '../types/types'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

function LogIn() {
  const history = useHistory()
  const location: LocationState = useLocation()
  const auth = useAuth()
  const { from } = location.state || { from: { pathname: '/' } }

  if (auth.authed) history.replace(from)

  const handleSignUp = async (googleResponse: any) => {
    console.log('googleResponse:', googleResponse)
    const googleToken = googleResponse.credential

    const res = await axios.post(
      '/users/google-login',
      {},
      {
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
      }
    )
    const apiToken: string = res.data.token || ''
    console.log('apiToken:', apiToken)
    await auth.login(apiToken)

    const user = res.status === 200 ? res.data.user : null
    await auth.setUser(user)
    history.replace(from)
  }

  return (
    <>
      <h1>LogIn</h1>
      {from.pathname !== '/' && (
        <p>You must log in to view the page at {from.pathname}</p>
      )}
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin onSuccess={handleSignUp} />
      </GoogleOAuthProvider>
    </>
  )
}
// "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
export default LogIn
