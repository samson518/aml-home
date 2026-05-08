"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"

export function AmlAssistantButton() {
  return (
    <Link
      href="http://localhost:8080/"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-[#1e5799] to-[#2989d8] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
      <span className="font-medium text-sm">反洗钱助手</span>
    </Link>
  )
}
