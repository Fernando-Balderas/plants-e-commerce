import mongoose, { Document } from 'mongoose'
import validEmail from '../util/validEmail'
import { Role } from '../types/user'

export type UserDocument = Document & {
  name: string
  lastname: string
  email: string
  password: string
  role: Role
}

const userSchema = new mongoose.Schema({
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
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(Role),
    default: Role.USER,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
