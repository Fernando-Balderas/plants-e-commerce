import User, { UserDocument } from '../models/User'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  const userExists = await User.findOne({ email: user.email })
  if (userExists) {
    throw new BadRequestError(`User ${user.email} already exist`)
  }
  return user.save()
}

const findById = async (userId: string): Promise<UserDocument> => {
  const userFound = await User.findById(userId)

  if (!userFound) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return userFound
}

const findByEmail = async (email: string): Promise<UserDocument> => {
  const userFound = await User.findOne({ email })

  if (!userFound) {
    throw new NotFoundError(`User ${email} not found`)
  }

  return userFound
}

const findByEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserDocument> => {
  const userFound = await User.findOne({
    email,
    password,
  })

  if (!userFound) {
    throw new NotFoundError(`User ${email} not found`)
  }

  return userFound
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().sort({ email: 1 })
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const userFound = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!userFound) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return userFound
}

const _delete = async (userId: string): Promise<UserDocument | null> => {
  const userFound = User.findByIdAndDelete(userId)

  if (!userFound) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return userFound
}

export default {
  create,
  findById,
  findByEmail,
  findByEmailAndPassword,
  findAll,
  update,
  _delete,
}
