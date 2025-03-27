"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateBalance } from "@/lib/balance"
import { addNotification } from "@/lib/notifications"
import { PAY_ID_CODE } from "@/lib/constants"

const NETWORKS = [
  { id: "airtel", name: "Airtel", logo: "/airtel-logo.png" },
  { id: "mtn", name: "MTN", logo: "/mtn-logo.png" },
  { id: "glo", name: "Glo", logo: "/glo-logo.png" },
  { id: "9mobile", name: "9mobile", logo: "/9mobile-logo.png" },
]

const AIRTIME_PLANS = {
  daily: [
    { duration: "1 DAY", amount: 50, cashback: 1 },
    { duration: "1 DAY", amount: 100, cashback: 2 },
    { duration: "1 DAY", amount: 200, cashback: 3 },
  ],
  weekly: [
    { duration: "7 DAYS", amount: 500, cashback: 5 },
    { duration: "7 DAYS", amount: 1000, cashback: 15 },
    { duration: "7 DAYS", amount: 2000, cashback: 30 },
  ],
  monthly: [
    { duration: "30 DAYS", amount: 5000, cashback: 100 },
    { duration: "30 DAYS", amount: 10000, cashback: 200 },
    { duration: "30 DAYS", amount: 20000, cashback: 400 },
  ],
}

export function AirtimeForm() {
  const [selectedNetwork, setSelectedNetwork] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [payIdCode, setPayIdCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("daily")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!selectedPlan) {
      setError("Please select an airtime plan")
      setIsLoading(false)
      return
    }

    if (payIdCode !== PAY_ID_CODE) {
      setError("Invalid PAY ID code")
      setIsLoading(false)
      return
    }

    try {
      updateBalance(selectedPlan.amount)

      const transaction = {
        type: "airtime",
        amount: selectedPlan.amount,
        date: new Date().toLocaleString(),
        details: {
          phoneNumber,
          network: selectedNetwork,
          duration: selectedPlan.duration,
        },
      }

      const transactions = JSON.parse(localStorage.getItem("transactions") || "[]")
      transactions.unshift(transaction)
      localStorage.setItem("transactions", JSON.stringify(transactions))

      localStorage.setItem(
        "lastAirtimeTopup",
        JSON.stringify({
          phoneNumber,
          amount: selectedPlan.amount,
          network: selectedNetwork,
          duration: selectedPlan.duration,
        }),
      )

      addNotification({
        title: "Airtime Purchase Successful",
        message: `Your ${selectedNetwork.toUpperCase()} airtime purchase of ₦${selectedPlan.amount.toLocaleString()} (${selectedPlan.duration}) for ${phoneNumber} was successful.`,
        type: "success",
      })

      router.push("/airtime/success")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {NETWORKS.map((network) => (
            <button
              key={network.id}
              type="button"
              onClick={() => setSelectedNetwork(network.id)}
              className={`flex items-center justify-center rounded-xl border p-3 text-sm ${
                selectedNetwork === network.id
                  ? "border-purple-600 bg-purple-600/10"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {network.name}
            </button>
          ))}
        </div>

        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter mobile number"
          className="w-full rounded-lg border border-gray-200 p-2 text-sm text-gray-900 placeholder-gray-400"
          required
        />

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-4">
            {["Daily", "Weekly", "Monthly"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-1 py-2 text-sm font-medium ${
                  activeTab === tab.toLowerCase()
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {AIRTIME_PLANS[activeTab as keyof typeof AIRTIME_PLANS].map((plan) => (
            <button
              key={`${plan.amount}-${plan.duration}`}
              type="button"
              onClick={() => setSelectedPlan(plan)}
              className={`relative flex flex-col items-center rounded-xl border p-2 text-xs ${
                selectedPlan === plan ? "border-purple-600 bg-purple-600/10" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-sm text-gray-500">{plan.duration}</span>
              <span className="text-xl font-bold">₦{plan.amount}</span>
              <span className="text-base">₦{plan.cashback} Cashback</span>
            </button>
          ))}
        </div>

        <input
          type="text"
          value={payIdCode}
          onChange={(e) => setPayIdCode(e.target.value)}
          placeholder="Enter PAY ID Code"
          className="w-full rounded-lg border border-gray-200 p-2 text-sm text-gray-900 placeholder-gray-400"
          required
        />
      </div>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isLoading || !selectedNetwork || !phoneNumber || !selectedPlan}
        className="w-full rounded-lg bg-purple-600 p-3 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Buy Airtime"}
      </button>
    </form>
  )
}

