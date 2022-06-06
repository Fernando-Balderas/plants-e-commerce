import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'

import useAuth from '../hooks/useAuth'
import { LocationState } from '../types/types'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

function LogIn() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { state }: LocationState = useLocation()

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
    login(apiToken).then(() => {
      navigate(state?.path || '/')
    })
  }

  return (
    <>
      <h1>LogIn page</h1>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin onSuccess={handleSignUp} />
      </GoogleOAuthProvider>
    </>
  )
}
// "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
export default LogIn
