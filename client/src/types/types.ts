import { ReactNode } from 'react'

export type Children = { children: ReactNode }

export type LocationState = {
  state?: { from: any }
}

export type User = {
  _id: string
  name: string
  lastname: string
  email: string
  role: string
  status: string
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
