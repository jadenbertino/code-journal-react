import { onAuthStateChanged } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from '../firebase/init'

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {

  const [authState, setAuthState] = useState(null)

  // auto login on mount
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthState(user)
    })
    unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }} >
      { children }
    </AuthContext.Provider>
  )
}