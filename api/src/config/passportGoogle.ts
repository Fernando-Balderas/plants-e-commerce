// @ts-ignore
import GoogleStrategy from 'passport-google-id-token'

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'

// dummy way to check if admin.
// you might have a whitelist of admins
const isAdmin = (domain: string) => {
  if (domain !== 'integrify.io') return false
  return true
}

const googleLoginStrategy = () => {
  return new GoogleStrategy(
    // {
    //   the clientId is optional in this case
    //   cliendID: process.env.GOOGLE_CLIENT_ID,
    // },
    async (
      parsedToken: {
        payload: { given_name: string; email: string; hd: string }
      },
      googleID: string,
      done: Function
    ) => {
      try {
        let user = await UserService.findByEmail(parsedToken.payload.email)
        console.log('isUserExists:', !!user)

        if (!user) {
          user = {
            name: parsedToken.payload.given_name,
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
