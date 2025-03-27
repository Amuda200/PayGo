"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Check user credentials
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.email === email && u.password === password)

    if (!user) {
      setError("Invalid credentials or you haven't registered yet")
      setIsLoading(false)
      return
    }

    // Set current user (without isNew flag for existing users)
    localStorage.setItem("currentUser", JSON.stringify({ ...user, isNew: false }))

    router.push("/dashboard")
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        name="email"
        type="email"
        placeholder="Enter Email"
        required
        className="w-full rounded-full border-2 border-gray-200 bg-white p-4 text-lg outline-none focus:border-blue-500"
      />
      <input
        name="password"
        type="password"
        placeholder="Enter Password"
        required
        className="w-full rounded-full border-2 border-gray-200 bg-white p-4 text-lg outline-none focus:border-blue-500"
      />
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full bg-black p-4 text-lg font-medium text-white transition-colors hover:bg-black/90 disabled:opacity-50"
      >
        Login
      </button>
    </form>
  )
}

