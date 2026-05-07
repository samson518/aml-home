"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

const quickQuestions = [
  "什么是可疑交易？",
  "如何识别洗钱行为？",
  "大额交易报告的标准是什么？",
  "可疑案件的审批流程？",
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "您好！我是反洗钱智能助手，可以帮助您解答反洗钱相关问题、协助案件分析、提供合规建议等。请问有什么可以帮助您的？",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
    }

    const assistantMessage: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: `感谢您的提问。关于"${input}"，我正在分析相关信息，请稍候...`,
    }

    setMessages([...messages, userMessage, assistantMessage])
    setInput("")
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex flex-col h-screen bg-[#f5f7fa]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1e5799] to-[#2989d8] text-white px-6 py-4 flex items-center gap-4 shadow-md">
        <Link href="/" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">反洗钱智能助手</h1>
            <p className="text-xs text-white/70">基于AI技术的智能问答系统</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-white/80">
          <Sparkles className="w-4 h-4" />
          <span>AI 驱动</span>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "user"
                  ? "bg-[#2989d8] text-white"
                  : "bg-white text-[#2989d8] border border-[#e0e6ed]"
              }`}
            >
              {message.role === "user" ? (
                <User className="w-5 h-5" />
              ) : (
                <Bot className="w-5 h-5" />
              )}
            </div>
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-[#2989d8] text-white rounded-tr-sm"
                  : "bg-white text-[#333] border border-[#e0e6ed] rounded-tl-sm shadow-sm"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Questions */}
      <div className="px-6 py-3 bg-white border-t border-[#e0e6ed]">
        <p className="text-xs text-[#666] mb-2">快捷问题：</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="px-3 py-1.5 text-xs bg-[#f0f5ff] text-[#2989d8] rounded-full hover:bg-[#e0edff] transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[#e0e6ed]">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="请输入您的问题..."
            className="flex-1 border-[#d0d7de] focus:border-[#2989d8] focus:ring-[#2989d8]/20"
          />
          <Button
            onClick={handleSend}
            className="bg-gradient-to-r from-[#1e5799] to-[#2989d8] hover:from-[#1a4d87] hover:to-[#247bc4] text-white px-6"
          >
            <Send className="w-4 h-4 mr-2" />
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}
