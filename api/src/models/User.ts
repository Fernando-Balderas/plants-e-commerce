import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  name: string
  lastname: string
  email: string
  password: string
  isAdmin: boolean
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
