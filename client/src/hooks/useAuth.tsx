import React, { createContext, useContext, useState } from 'react'
import { Children } from '../types/types'

type AuthContext = {
  authed: boolean
  accessToken: string
  login: (token: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContextDefaults = {
  authed: false,
  accessToken: '',
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
}

const authContext = createContext<AuthContext>(AuthContextDefaults)

function useAuth() {
  const [authed, setAuthed] = useState(false)
  const [accessToken, setAccessToken] = useState('')

  return {
    authed,
    accessToken,
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
        setAuthed(false)
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
