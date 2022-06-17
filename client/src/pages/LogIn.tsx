import { useLocation, useHistory } from 'react-router-dom'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import axios from '../helpers/axios/instance'
import useAuth from '../hooks/useAuth'
import { LocationState } from '../types/types'
import { GOOGLE_CLIENT_ID } from '../util/secrets'
import LoginForm from '../components/LoginForm'

function LogIn() {
  const history = useHistory()
  const location: LocationState = useLocation()
  const auth = useAuth()
  const { from } = location.state || { from: { pathname: '/' } }

  if (auth.authed) history.replace(from)

  const handleGoogleLogin = async (googleResponse: any) => {
    try {
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
      if (res.status !== 200) throw new Error()
      const apiToken: string = res.data.token || ''
      const user = res.data.user || null
      await auth.login(apiToken)
      await auth.setUser(user)
      history.replace(from)
    } catch (error) {
      alert('Login error')
    }
  }

  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={3}>
          <h1 className="login-title">LogIn</h1>
          {from.pathname !== '/' && (
            <p>You must log in to view the page at {from.pathname}</p>
          )}
          <LoginForm from={from} />
          <div className="margin">
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log('Google login Failed')
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </Col>
      </Row>
    </>
  )
}
// "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
export default LogIn
