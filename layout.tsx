import type React from "react"
import "@/styles/globals.css"
import { Footer } from "@/components/footer"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
