import mongoose, { Document } from 'mongoose'
import { Role } from 'user'

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
    index: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.USER,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
