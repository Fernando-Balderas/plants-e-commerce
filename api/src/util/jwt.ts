import jwt from 'jsonwebtoken'
import { PartialUser } from '../types/user'
import { JWT_SECRET } from '../util/secrets'

export function createJwtToken(payload: PartialUser) {
  const options = {
    expiresIn: '1h',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}
