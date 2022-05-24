import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  name: string
  lastname: string
  email: string
  password: string
  role: string
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
    default: 'USER',
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
