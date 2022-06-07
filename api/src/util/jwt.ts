import jwt from 'jsonwebtoken'
import { UserDocument } from '../models/User'
import { PartialUser } from 'user'
import { JWT_SECRET } from '../util/secrets'

export function createJwtToken(user: UserDocument) {
  const payload: PartialUser = {
    email: user.email,
    role: user.role,
  }
  const options = {
    expiresIn: '1h',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}
