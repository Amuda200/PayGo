"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.some((user: any) => user.email === email)) {
      setError("Email already exists")
      setIsLoading(false)
      return
    }

    // Save new user
    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Set current user and mark as new
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    localStorage.setItem("showWelcomePopup", "true")

    // Set initial balance to 180,000 naira
    localStorage.setItem("balance", "180000")

    router.push("/splash")
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        name="name"
        type="text"
        placeholder="Enter Name"
        required
        className="w-full rounded-full border-2 border-gray-200 bg-white p-4 text-base outline-none focus:border-blue-500"
      />
      <input
        name="email"
        type="email"
        placeholder="Enter Email"
        required
        className="w-full rounded-full border-2 border-gray-200 bg-white p-4 text-base outline-none focus:border-blue-500"
      />
      <input
        name="password"
        type="password"
        placeholder="Enter Password"
        required
        className="w-full rounded-full border-2 border-gray-200 bg-white p-4 text-base outline-none focus:border-blue-500"
      />
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full bg-black p-4 text-lg font-medium text-white transition-colors hover:bg-black/90 disabled:opacity-50"
      >
        Register
      </button>
    </form>
  )
}

