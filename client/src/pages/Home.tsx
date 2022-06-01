import React, { useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'

import { GOOGLE_CLIENT_ID } from '../util/secrets'

function Home() {
  const [token, setToken] = useState('')
  console.log('token:', token)

  // TODO: isLogged redux
  // if (!isLogged) {
  //   const navigate = useNavigate()
  //   navigate('/login')
  // }

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

  const handleGetProducts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/products',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('response:', response.data)
    } catch (error: any) {
      console.log('error:', error.response.data)
    }
  }
  return (
    <>
      <h1>Home page</h1>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin onSuccess={handleSucess} />
      </GoogleOAuthProvider>
      <button
        style={{ width: '200px', height: '80px', marginTop: '1rem' }}
        onClick={handleGetProducts}
      >
        GET PRODUCTS
      </button>
    </>
  )
}
// "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
export default Home
