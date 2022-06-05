import React, { useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

function SignUp() {
  const [token, setToken] = useState('')
  console.log('token:', token)

  const handleSucess = async (googleResponse: any) => {
    const googleToken = googleResponse.credential
    console.log('googleToken:', googleToken)

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
    setToken(apiToken)
  }
  return (
    <>
      <h1>SignUp page</h1>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin onSuccess={handleSucess} />
      </GoogleOAuthProvider>
    </>
  )
}

export default SignUp
