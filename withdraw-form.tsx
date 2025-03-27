"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getBalance, updateBalance } from "@/lib/balance"
import { addNotification } from "@/lib/notifications"
import { PAY_ID_CODE } from "@/lib/constants"

const BANKS = [
  "Access Bank",
  "Citibank",
  "Ecobank",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank",
  "Guaranty Trust Bank",
  "Heritage Bank",
  "Keystone Bank",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
  "Jaiz Bank",
  "Titan Trust Bank",
  "Globus Bank",
  "SunTrust Bank",
  "Parallex Bank",
  "Opay",
  "Palmpay",
  "Kuda Bank",
  "VFD Microfinance Bank",
  "Rubies Bank",
  "Mint Finex MFB",
  "Monie Point MFB",
  "Sparkle Bank",
  "Taj Bank",
  "Coronation Merchant Bank",
  "FBNQuest Merchant Bank",
  "FSDH Merchant Bank",
  "Rand Merchant Bank",
  "Nova Merchant Bank",
  "Greenwich Merchant Bank",
  "Finatrust Microfinance Bank",
  "Ekondo Microfinance Bank",
  "Finca Microfinance Bank",
  "Accion Microfinance Bank",
  "Advans La Fayette Microfinance Bank",
  "AB Microfinance Bank",
  "Baobab Microfinance Bank",
  "Fortis Microfinance Bank",
  "Lapo Microfinance Bank",
  "NPF Microfinance Bank",
  "Page Microfinance Bank",
  "Petra Microfinance Bank",
  "Seed Capital Microfinance Bank",
  "Trustbond Mortgage Bank",
  "Jubilee Life Mortgage Bank",
  "Haggai Mortgage Bank",
  "Mayfresh Mortgage Bank",
  "Gateway Mortgage Bank",
  "Abbey Mortgage Bank",
  "Refuge Mortgage Bank",
  "Lagos Building Investment Company",
  "Infinity Trust Mortgage Bank",
  "Platinum Mortgage Bank",
  "First Generation Mortgage Bank",
  "Brent Mortgage Bank",
  "AG Mortgage Bank",
  "Livingtrust Mortgage Bank",
  "Imperial Homes Mortgage Bank",
  "Homebase Mortgage Bank",
  "Covenant Microfinance Bank",
  "Safetrust Mortgage Bank",
]

export function WithdrawForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [balance, setBalance] = useState("200000")
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [showPayIdMessage, setShowPayIdMessage] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setBalance(getBalance())

    // Show PAY ID message after 4 seconds
    const timer = setTimeout(() => {
      setShowPayIdMessage(true)
    }, 4000)

    // Hide PAY ID message after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowPayIdMessage(false)
    }, 14000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const amount = Number(formData.get("amount"))
    const payIdCode = formData.get("payIdCode")

    // Validate amount
    if (amount > Number(balance)) {
      setError("Insufficient balance")
      setIsLoading(false)
      return
    }

    // Validate PAY ID code
    if (payIdCode !== PAY_ID_CODE) {
      setError("Invalid PAY ID code")
      setShowErrorPopup(true)
      setIsLoading(false)
      return
    }

    try {
      // Update balance
      updateBalance(amount)

      // Store transfer details for success page
      const transferDetails = {
        amount,
        accountName: formData.get("accountName"),
        accountNumber: formData.get("accountNumber"),
        bank: formData.get("bank"),
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("lastTransfer", JSON.stringify(transferDetails))

        // Add transaction to history
        const transaction = {
          type: "withdrawal",
          amount,
          date: new Date().toLocaleString(),
          details: transferDetails,
        }

        const transactions = JSON.parse(localStorage.getItem("transactions") || "[]")
        transactions.unshift(transaction)
        localStorage.setItem("transactions", JSON.stringify(transactions))

        // Add notification
        addNotification({
          title: "Withdrawal Successful",
          message: `Your withdrawal of ₦${amount.toLocaleString()} to ${transferDetails.bank} (${
            transferDetails.accountNumber
          }) was successful.`,
          type: "success",
        })
      }

      router.push("/transfer-success")
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <>
      {showPayIdMessage && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
          Please purchase your PAY ID from the app to enable withdrawals.
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="accountName"
          type="text"
          placeholder="Account Name"
          required
          className="w-full rounded-xl border-2 border-purple-600 p-3 text-sm"
        />
        <input
          name="accountNumber"
          type="text"
          placeholder="Account Number"
          required
          className="w-full rounded-xl border-2 border-purple-600 p-3 text-sm"
        />
        <select
          name="bank"
          required
          defaultValue=""
          className="w-full rounded-xl border-2 border-purple-600 p-3 text-sm"
        >
          <option value="" disabled>
            Select Bank
          </option>
          {BANKS.map((bank) => (
            <option key={bank} value={bank.toLowerCase().replace(/\s+/g, "-")}>
              {bank}
            </option>
          ))}
        </select>
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          required
          className="w-full rounded-xl border-2 border-purple-600 p-3 text-sm"
        />
        <div className="space-y-1">
          <input
            name="payIdCode"
            type="text"
            placeholder="Enter PAY ID Code"
            required
            className="w-full rounded-xl border-2 border-purple-600 p-3 text-sm"
          />
          <p className="text-sm text-purple-600">
            Don't have a PAY ID?{" "}
            <a href="/buy-payid" className="underline">
              Buy PAY ID
            </a>
          </p>
        </div>
        <p className="text-sm">Available Balance: ₦{balance}.00</p>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-purple-600 p-3 text-sm font-medium text-white hover:bg-purple-700"
        >
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </form>
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Error</h3>
            <p>Invalid PAY ID code. Please try again.</p>
            <button onClick={() => setShowErrorPopup(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

