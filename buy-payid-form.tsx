"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function BuyPayIdForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Get email from form
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const email = formData.get("email") as string

    // Store email for payment page
    localStorage.setItem("payidUserEmail", email)

    // Navigate to loading page
    router.push("/buy-payid/loading")
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="space-y-1">
        <label htmlFor="amount" className="text-xs font-medium text-gray-700">
          Amount
        </label>
        <input
          id="amount"
          type="text"
          value="₦7,200"
          readOnly
          className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-sm"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="fullName" className="text-xs font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Your full name"
          required
          className="w-full rounded-lg border border-gray-300 p-2 text-sm"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="text-xs font-medium text-gray-700">
          Your Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email address"
          required
          className="w-full rounded-lg border border-gray-300 p-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-purple-600 p-4 text-base font-medium text-white hover:bg-purple-700"
      >
        {isLoading ? "Processing..." : "Pay"}
      </button>
    </form>
  )
}

