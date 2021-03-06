import mongoose, { Document } from 'mongoose'
import validEmail from '../util/validEmail'
import { Role, UserStatus } from '../types/user'

export type UserDocument = Document & {
  name: string
  lastname: string
  email: string
  password?: string
  role: Role
  status: UserStatus
  resetPasswordToken: string
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      validate: validEmail,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    resetPasswordToken: {
      type: String,
      unique: true,
      default: '',
    },
  },
  { timestamps: true }
)

export default mongoose.model<UserDocument>('User', userSchema)
