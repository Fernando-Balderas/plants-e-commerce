// @ts-ignore
import GoogleTokenStrategy from 'passport-google-id-token'

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'

type Payload = {
  iss: string
  azp: string
  aud: string
  sub: string
  at_hash: string
  hd: string
  email: string
  email_verified: string
  iat: number
  exp: number
  nonce: string
  family_name: string
  given_name: string
  locale: string
  name: string
  picture: string
  profile: string
}

// dummy way to check if admin.
// you might have a whitelist of admins
function isAdmin(domain: string) {
  if (domain !== 'integrify.io') return false
  return true
}

function googleLoginStrategy() {
  return new GoogleTokenStrategy(
    {
      // the clientId is optional in this case
      cliendID: process.env.GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: {
        payload: Payload
      },
      googleID: string,
      done: Function
    ) => {
      console.log('parsedToken ', parsedToken)
      try {
        let user = await UserService.findByEmailOrNull(
          parsedToken.payload.email
        )
        console.log('isUserExists:', !!user)

        if (!user) {
          user = {
            name: parsedToken.payload.given_name,
            lastname: parsedToken.payload.family_name,
            email: parsedToken.payload.email,
            role: isAdmin(parsedToken.payload.hd) ? 'ADMIN' : 'USER',
          } as UserDocument

          const newUser = new User(user)
          await UserService.create(newUser)
        }
        // Append user object to req.user
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}

export default googleLoginStrategy
