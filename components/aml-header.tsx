"use client"

import { Mail, Filter, Users, Beaker, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AmlHeader() {
  return (
    <header className="flex items-center justify-between h-12 px-4 bg-gradient-to-r from-[#2c5282] to-[#3182ce] text-white">
      {/* Logo and title */}
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-medium tracking-wide">
          反洗钱监测分析及数据报送系统
        </h1>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Model Lab */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">
          <Beaker className="h-4 w-4" />
          <span className="text-sm">模型实验室</span>
        </button>

        {/* Combined Query */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">
          <Filter className="h-4 w-4" />
          <span className="text-sm">综合查询</span>
        </button>

        {/* Customer View */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">
          <Users className="h-4 w-4" />
          <span className="text-sm">客户视图</span>
        </button>

        {/* Messages */}
        <button className="relative flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 transition-colors">
          <Mail className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-medium bg-red-500 rounded-full">
            0
          </span>
        </button>

        {/* User info */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/20">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.png" alt="用户头像" />
            <AvatarFallback className="bg-[#5bc0de] text-white text-xs">
              用户
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-xs leading-tight">
            <span className="text-white/80">欢迎：3033</span>
            <span className="text-white">13</span>
          </div>
          <ChevronDown className="h-4 w-4 text-white/60" />
        </div>
      </div>
    </header>
  )
}
