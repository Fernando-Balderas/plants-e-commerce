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
