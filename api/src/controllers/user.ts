import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import User, { UserDocument } from '../models/User'
import userService from '../services/user'
import { BadRequestError } from '../helpers/apiError'
import timeConstantCompare from '../util/timeConstantCompare'
import sendCustomEmail from '../util/sendCustomEmail'
import { JWT_SECRET } from '../util/secrets'

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, lastname, email, password, role } = req.body

    const user = new User({
      name,
      lastname,
      email,
      password,
      role,
    })

    await userService.create(user)
    res.json(user)
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
    const { name, lastname, email } = req.body
    const update = { name, lastname, email }
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
    const update = { password: newPassword }
    const userId = req.params.userId
    const user = await userService.findById(userId)
    if (oldPassword === newPassword) throw new BadRequestError('Invalid inputs')
    if (!(await timeConstantCompare(oldPassword, user.password)))
      throw new BadRequestError('Invalid inputs')
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
    const { email } = req.body
    const token = new mongoose.Types.ObjectId().toHexString()
    const update = { resetPasswordToken: token }
    const user = await userService.findByEmail(email)
    const subject = 'Reset password'
    const text = `To set a new password please follow the link. ${process.env.SERVER_PASS_URL}?id=${user._id}&token=${token}`
    sendCustomEmail(email, subject, text)
    await userService.update(user._id, update)
    res.status(202).json({ message: 'Recovery email sent', token })
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
    const user = req.user as UserDocument
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    })
    res.json({ token })
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
    res.json(await userService.findById(req.params.userId))
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
    res.json(await userService.findByEmailAndPassword(email, password))
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
}
