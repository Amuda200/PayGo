"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function BpcPaymentForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    // Add payment processing logic here
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-2">
        <label className="block text-2xl text-gray-500">Amount</label>
        <input
          type="text"
          value="₦5,500"
          disabled
          className="w-full rounded-lg border border-gray-300 p-4 text-lg text-gray-600"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-2xl text-gray-500">Full Name</label>
        <input
          type="text"
          placeholder="Your full name"
          required
          className="w-full rounded-lg border border-gray-300 p-4 text-lg text-gray-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-2xl text-gray-500">Your Email Address</label>
        <input
          type="email"
          placeholder="email address"
          required
          className="w-full rounded-lg border border-gray-300 p-4 text-lg text-gray-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-8 w-full rounded-lg bg-[#1e2b66] p-4 text-xl font-medium text-white hover:bg-[#1e2b66]/90"
      >
        Pay
      </button>
    </form>
  )
}

