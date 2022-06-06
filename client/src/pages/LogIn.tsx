import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'

import useAuth from '../hooks/useAuth'
import { LocationState } from '../types/types'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

function LogIn() {
  let history = useHistory()
  let location: { state: { from: any } } = useLocation()
  // const { state }: LocationState = useLocation()
  let auth = useAuth()
  let { from } = location.state || { from: { pathname: '/' } }

  const handleSignUp = async (googleResponse: any) => {
    console.log('googleResponse:', googleResponse)
    const googleToken = googleResponse.credential

    const res = await axios.post(
      'http://localhost:5000/api/v1/users/google-login',
      {},
      {
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
      }
    )

    const apiToken: string = res.data.token
    auth.login(apiToken).then(() => {
      // history.push(state?.path || '/')
      history.replace(from)
    })
  }

  return (
    <>
      <h1>LogIn page</h1>
      <p>You must log in to view the page at {from.pathname}</p>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin onSuccess={handleSignUp} />
      </GoogleOAuthProvider>
    </>
  )
}
// "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
export default LogIn
