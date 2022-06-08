import React, { createContext, useContext, useState } from 'react'
import { Children, User } from '../types/types'

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

  return {
    authed,
    accessToken,
    user,
    login(token: string) {
      return new Promise<void>((res) => {
        setAccessToken(token)
        setAuthed(true)
        res()
      })
    },
    logout() {
      return new Promise<void>((res) => {
        setAccessToken('')
        setUser(null)
        setAuthed(false)
        res()
      })
    },
    setUser(user: UserOrNull) {
      return new Promise<void>((res) => {
        setUser(user)
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
