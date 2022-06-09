import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import userService from '../services/user'
import { BadRequestError } from '../helpers/apiError'
import { timeConstantCompare } from '../util/password'
import { cryptoHexHash, isHashMatch, toHash } from '../util/hashing'
import { createJwtToken } from '../util/jwt'
import { PartialUser } from 'user'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, lastname, email, password, role } = req.body
    const hashedPassword = await toHash(password)
    const user = new User({
      name,
      lastname,
      email,
      password: hashedPassword,
      role,
    })
    await userService.create(user)
    user.password = undefined
    res.status(201).json({ message: 'User created' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, lastname } = req.body
    const update = { name, lastname }
    const userId = req.params.userId
    const updatedUser = await userService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body
    const update = { status }
    const userId = req.params.userId
    const updatedUser = await userService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body
    const userId = req.params.userId
    const user = await userService.findById(userId)

    const match = await isHashMatch(oldPassword, user.password || '')
    if (match) {
      if (!timeConstantCompare(oldPassword, newPassword))
        throw new BadRequestError('Invalid inputs')
    }

    const hashedPassword = await toHash(newPassword)
    const update = { password: hashedPassword }
    await userService.update(userId, update)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, resetToken, newPassword } = req.body
    if (email) {
      const token = cryptoHexHash(new Date().toString(), 'sha512')
      const update = { resetPasswordToken: token }
      const user = await userService.findByEmail(email)
      // const subject = 'Reset password'
      // const text = `To set a new password please follow the link. ${process.env.SERVER_PASS_URL}?id=${user._id}&token=${token}`
      // sendCustomEmail(email, subject, text)
      await userService.update(user._id, update)
      res.status(202).json({ message: 'Reset token created', token })
    } else if (resetToken) {
      const user = await userService.findByResetToken(email)
      const hashedPassword = await toHash(newPassword)
      const update = { password: hashedPassword, resetPasswordToken: '' }
      await userService.update(user._id, update)
      res.status(204).end()
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const _delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService._delete(req.params.userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, name, lastname, email, role, picture } =
      req.user as PartialUser
    const user = { _id, name, lastname, email, role, picture }
    const token = createJwtToken(user)
    res.json({ token, user })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.findById(req.params.userId)
    user.password = undefined
    res.json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const findByEmailAndPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await userService.findByEmail(email)
    const match = await isHashMatch(password, user.password || '')
    if (!match) throw new BadRequestError('TESTING ERROR')
    const { _id, name, lastname, role, picture } = user as PartialUser
    const userForHash = { _id, name, lastname, email, role, picture }
    const token = createJwtToken(userForHash)
    res.json({ token })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(req.user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export default {
  create,
  updateProfile,
  updateStatus,
  updatePassword,
  resetPassword,
  _delete,
  googleLogin,
  findById,
  findByEmailAndPassword,
  findAll,
  validateToken,
}
