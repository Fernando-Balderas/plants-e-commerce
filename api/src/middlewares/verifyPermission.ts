import { Request, Response, NextFunction } from 'express'

import { ForbiddenError } from '../helpers/apiError'
import { hasPermission, Method } from '../util/permissionsMatrix'
import { PartialUser, Role, UserStatus } from '../types/user'

export default function verifyPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { baseUrl, method } = req
    const { role, status } = req.user as PartialUser
    if (status && status !== UserStatus.ACTIVE) throw new Error()
    if (!hasPermission(role as Role, baseUrl, method as Method))
      throw new Error()
    next()
  } catch (error) {
    throw new ForbiddenError()
  }
}
