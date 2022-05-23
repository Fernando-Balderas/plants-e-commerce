/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'

export type OrderDocument = Document & {
  total: number
  paymentStatus: string
  userId: Schema.Types.ObjectId
  products: Schema.Types.ObjectId[]
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
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
})

export default mongoose.model<OrderDocument>('Order', orderSchema)
