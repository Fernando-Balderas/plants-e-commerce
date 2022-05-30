/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'
import { PaymentStatus } from '../types/order'

export type OrderDocument = Document & {
  total: number
  status: PaymentStatus
  userId: Schema.Types.ObjectId
  products: Schema.Types.ObjectId[]
}

const orderSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING,
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
})

export default mongoose.model<OrderDocument>('Order', orderSchema)
