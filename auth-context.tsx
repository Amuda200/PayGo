"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  email: string
  setEmail: (email: string) => void
  username: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("userEmail") || ""
      setEmail(storedEmail)
      setUsername(storedEmail.split("@")[0])
    }
  }, [])

  const value = {
    email,
    setEmail: (newEmail: string) => {
      setEmail(newEmail)
      setUsername(newEmail.split("@")[0])
      if (typeof window !== "undefined") {
        localStorage.setItem("userEmail", newEmail)
      }
    },
    username,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

