export {}
// import React, { createContext, useContext, useState } from 'react'

// const DefaultAuthContext = {
//   user: '',
//   signin: (cb: any) => {},
//   signout: (cb: any) => {},
// }

// const fakeAuth = {
//   isAuthenticated: false,
//   signin(cb: any) {
//     fakeAuth.isAuthenticated = true
//     setTimeout(cb, 100) // fake async
//   },
//   signout(cb: any) {
//     fakeAuth.isAuthenticated = false
//     setTimeout(cb, 100)
//   },
// }

// const authContext = createContext(DefaultAuthContext)

// export function AuthProvider({ children }: any) {
//   const auth = useProvideAuth()
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>
// }

// function useAuth2() {
//   return useContext(authContext)
// }

// function useProvideAuth() {
//   const [user, setUser] = useState('')

//   const signin = (cb: any) => {
//     return fakeAuth.signin(() => {
//       setUser('user')
//       cb()
//     })
//   }

//   const signout = (cb: any) => {
//     return fakeAuth.signout(() => {
//       setUser('')
//       cb()
//     })
//   }

//   return {
//     user,
//     signin,
//     signout,
//   }
// }

// export default useAuth2
