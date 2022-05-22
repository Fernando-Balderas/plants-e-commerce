/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  description: string
  price: number
  categories: string[]
  variants: string[]
  sizes: string[]
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  categories: [String],
  variants: [String],
  sizes: [String],
})

export default mongoose.model<ProductDocument>('Product', productSchema)
