import React, { createContext, useContext, useState } from 'react'
import { Children, User } from '../types/types'
import { LOCALSTORAGE_TOKEN, LOCALSTORAGE_USER } from '../util/constants'

type UserOrNull = Partial<User> | null

type AuthContext = {
  authed: boolean
  accessToken: string
  user: UserOrNull
  login: (token: string) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: UserOrNull) => Promise<void>
}

const AuthContextDefaults = {
  authed: false,
  accessToken: '',
  user: null,
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
  setUser: () => Promise.reject(),
}

const authContext = createContext<AuthContext>(AuthContextDefaults)

function useAuth() {
  const [authed, setAuthed] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [user, setUser] = useState<UserOrNull>(null)

  const token = localStorage.getItem(LOCALSTORAGE_TOKEN)
  const userStr = localStorage.getItem(LOCALSTORAGE_USER)
  const parsedUser = userStr ? JSON.parse(userStr) : null
  if (token && !accessToken) {
    setAuthed(true)
    setAccessToken(token)
    setUser(parsedUser)
  }

  return {
    authed,
    accessToken,
    user,
    login(token: string) {
      return new Promise<void>((res) => {
        setAccessToken(token)
        setAuthed(true)
        localStorage.setItem(LOCALSTORAGE_TOKEN, token)
        res()
      })
    },
    logout() {
      return new Promise<void>((res) => {
        setAccessToken('')
        setUser(null)
        setAuthed(false)
        localStorage.removeItem(LOCALSTORAGE_TOKEN)
        localStorage.removeItem(LOCALSTORAGE_USER)
        res()
      })
    },
    setUser(user: UserOrNull) {
      return new Promise<void>((res) => {
        setUser(user)
        localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(user))
        res()
      })
    },
  }
}

export function AuthProvider({ children }: Children) {
  const auth = useAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export default function AuthConsumer() {
  return useContext(authContext)
}
