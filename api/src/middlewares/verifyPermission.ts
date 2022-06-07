import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError } from '../helpers/apiError'
import { hasPermission, Method } from '../util/permissionsMatrix'
import { PartialUser, Role } from 'user'

export default function verifyPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log('into verifyPermission ', req.method)
    console.log('user ', req.user)
    const { role } = req.user as PartialUser
    if (!hasPermission(role as Role, req.method as Method)) throw new Error()
    next()
  } catch (error) {
    throw new ForbiddenError()
  }
}
