import { ReactNode } from 'react'

export type Children = { children: ReactNode }

export type LocationState = {
  state?: { from: any }
}

export type User = {
  email: string
  name: string
  role: string
}

export type Product = {
  _id: string
  name: string
  description: string
  price: number
  categories: string[]
  variants: string[]
  sizes: string[]
}
