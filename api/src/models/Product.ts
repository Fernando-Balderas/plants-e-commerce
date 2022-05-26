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
})

export default mongoose.model<ProductDocument>('Product', productSchema)
