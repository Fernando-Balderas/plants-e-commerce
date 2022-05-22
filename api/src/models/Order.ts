/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type OrderDocument = Document & {
  total: number
  paymentStatus: string
  userId: string
  products: string[] // Product[]
}

const orderSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
  },
  userId: {
    type: String,
  },
  products: [String],
})

export default mongoose.model<OrderDocument>('Order', orderSchema)
