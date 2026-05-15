"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  List,
  Settings,
  CheckSquare,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  closable?: boolean
}

const tabs: Tab[] = [
  { id: "home", label: "首页", closable: false },
  { id: "suspicious", label: "可疑行为甄别", closable: true },
]

interface CaseItem {
  id: string
  date: string
  count: number
  subItems: {
    id: string
    label: string
    count: number
  }[]
}

const caseData: CaseItem[] = [
  {
    id: "1",
    date: "2022-07-20",
    count: 1,
    subItems: [
      {
        id: "1-1",
        label: "涉嫌其他犯罪的可疑交易行...",
        count: 1,
      },
    ],
  },
]

export function AmlContent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("suspicious")
  const [expandedCases, setExpandedCases] = useState<string[]>(["1"])

  const toggleCase = (id: string) => {
    setExpandedCases((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center justify-between px-4 bg-[#f5f5f5] border-b border-gray-200">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1 px-4 py-2.5 text-sm border-b-2 transition-colors",
                activeTab === tab.id
                  ? "text-[#337ab7] border-[#337ab7]"
                  : "text-gray-600 border-transparent hover:text-gray-800"
              )}
            >
              {tab.label}
              {tab.closable && (
                <X className="h-3.5 w-3.5 ml-1 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          ))}
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded hover:bg-gray-100">
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-100">
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-100">
            <List className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-[#f0ad4e] fill-[#f0ad4e]" />
            <h2 className="text-lg font-medium text-gray-800">待甄别可疑案例</h2>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
            <List className="h-4 w-4" />
            <span>列表</span>
          </button>
        </div>

        {/* Case list */}
        <div className="max-w-lg">
          {caseData.map((caseItem) => (
            <div
              key={caseItem.id}
              className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden"
            >
              {/* Case header */}
              <button
                onClick={() => toggleCase(caseItem.id)}
                className="flex items-center gap-2 w-full px-3 py-2.5 bg-[#d9edf7] text-[#31708f] text-sm hover:bg-[#c4e3f3] transition-colors"
              >
                <CheckSquare className="h-4 w-4 text-[#337ab7]" />
                <span>
                  {caseItem.date}待甄别{" "}
                  <span className="text-[#337ab7] font-medium">
                    {caseItem.count}
                  </span>{" "}
                  笔
                </span>
              </button>

              {/* Sub items */}
              {expandedCases.includes(caseItem.id) && (
                <div className="border-t border-gray-100">
                  {caseItem.subItems.map((subItem) => (
                    <div
                      key={subItem.id}
                      onClick={() => router.push("/detail")}
                      className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Settings className="h-4 w-4 text-gray-400" />
                        <span>{subItem.label}</span>
                      </div>
                      <Badge className="bg-[#5bc0de] hover:bg-[#46b8da] text-white text-xs px-2 py-0.5 rounded-full">
                        {subItem.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
