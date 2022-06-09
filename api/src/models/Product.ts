/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  description: string
  price: number
  categories: string[]
  variants: string[]
  sizes: string[]
  userId: string
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    categories: {
      type: [String],
    },
    variants: {
      type: [String],
    },
    sizes: {
      type: [String],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export default mongoose.model<ProductDocument>('Product', productSchema)
