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

const DATA_PLANS = {
  daily: [
    { duration: "1 DAY", data: "200", price: 150 },
    { duration: "1 DAY", data: "500", price: 200 },
    { duration: "1 DAY", data: "100", price: 70 },
    { duration: "1 DAY", data: "1000", price: 350, tag: "1GB" },
  ],
  weekly: [
    { duration: "7 DAYS", data: "2500", price: 500, tag: "2.5GB" },
    { duration: "7 DAYS", data: "5000", price: 1000, tag: "5GB" },
    { duration: "7 DAYS", data: "3000", price: 650, tag: "3GB" },
    { duration: "7 DAYS", data: "1500", price: 450, tag: "1.5GB" },
  ],
  monthly: [
    { duration: "30 DAYS", data: "5000", price: 1200, tag: "5GB" },
    { duration: "30 DAYS", data: "7000", price: 2000, tag: "7GB" },
    { duration: "30 DAYS", data: "2000", price: 600, tag: "2GB" },
    { duration: "30 DAYS", data: "10000", price: 2500, tag: "10GB" },
    { duration: "30 DAYS", data: "15000", price: 3000, tag: "15GB" },
  ],
}

export function DataBundleForm() {
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
      setError("Please select a data plan")
      setIsLoading(false)
      return
    }

    if (payIdCode !== PAY_ID_CODE) {
      setError("Invalid PAY ID code")
      setIsLoading(false)
      return
    }

    try {
      updateBalance(selectedPlan.price)

      const transaction = {
        type: "data",
        amount: selectedPlan.price,
        date: new Date().toLocaleString(),
        details: {
          phoneNumber,
          data: selectedPlan.tag || `${selectedPlan.data}MB`,
          network: selectedNetwork,
          duration: selectedPlan.duration,
        },
      }

      const transactions = JSON.parse(localStorage.getItem("transactions") || "[]")
      transactions.unshift(transaction)
      localStorage.setItem("transactions", JSON.stringify(transactions))

      localStorage.setItem(
        "lastDataPurchase",
        JSON.stringify({
          phoneNumber,
          data: selectedPlan.tag || `${selectedPlan.data}MB`,
          price: selectedPlan.price,
          network: selectedNetwork,
          duration: selectedPlan.duration,
        }),
      )

      // Add notification
      addNotification({
        title: "Data Purchase Successful",
        message: `Your ${selectedNetwork.toUpperCase()} data purchase of ${
          selectedPlan.tag || `${selectedPlan.data}MB`
        } (${selectedPlan.duration}) for ${phoneNumber} was successful.`,
        type: "success",
      })

      router.push("/data/success")
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
          {DATA_PLANS[activeTab as keyof typeof DATA_PLANS].map((plan) => (
            <button
              key={`${plan.data}-${plan.duration}`}
              type="button"
              onClick={() => setSelectedPlan(plan)}
              className={`relative flex flex-col items-center rounded-xl border p-2 text-xs ${
                selectedPlan === plan ? "border-purple-600 bg-purple-600/10" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-sm text-gray-500">{plan.duration}</span>
              <span className="text-xl font-bold">{plan.tag || `${plan.data}MB`}</span>
              <span className="text-base">₦{plan.price}</span>
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
        {isLoading ? "Processing..." : "Buy Data"}
      </button>
    </form>
  )
}

