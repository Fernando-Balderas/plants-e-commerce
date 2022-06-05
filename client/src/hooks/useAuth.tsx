import React, { createContext, useContext, useState } from 'react'
import { Children } from '../types/types'

type AuthContext = {
  authed: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContextDefaults = {
  authed: false,
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
}

const authContext = createContext<AuthContext>(AuthContextDefaults)

function useAuth() {
  const [authed, setAuthed] = useState(false)

  return {
    authed,
    login() {
      return new Promise<void>((res) => {
        setAuthed(true)
        res()
      })
    },
    logout() {
      return new Promise<void>((res) => {
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
