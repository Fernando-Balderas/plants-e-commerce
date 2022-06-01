import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

export default function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers.authorization || ''
    const token = auth.split(' ')[1]
    const user = jwt.verify(token, JWT_SECRET)
    req.user = user
    next()
  } catch (error) {
    throw new ForbiddenError()
  }
}
