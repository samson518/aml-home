"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronLeft,
  Settings,
  Database,
  Zap,
  Eye,
  FileText,
  Users,
  BarChart3,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  children?: { id: string; label: string }[]
}

const menuItems: MenuItem[] = [
  {
    id: "business",
    label: "业务处理平台",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    id: "data-entry",
    label: "数据补录平台",
    icon: <Database className="h-4 w-4" />,
    children: [],
  },
  {
    id: "large-data",
    label: "大额处理数据",
    icon: <Zap className="h-4 w-4" />,
    children: [],
  },
  {
    id: "suspicious",
    label: "可疑行为监测",
    icon: <Eye className="h-4 w-4" />,
    children: [
      { id: "identify", label: "可疑行为甄别" },
      { id: "review", label: "可疑案件审查" },
      { id: "approve", label: "可疑案件审批" },
      { id: "investigate", label: "可疑案件协查" },
      { id: "track", label: "跟踪可疑案件" },
      { id: "params", label: "复核已排除设置参数" },
      { id: "excluded", label: "已排除可疑案件" },
      { id: "manual-review", label: "人工复核已排除可疑案件" },
    ],
  },
  {
    id: "risk",
    label: "客户风险评级",
    icon: <Users className="h-4 w-4" />,
    children: [],
  },
  {
    id: "report",
    label: "人工报文管理",
    icon: <FileText className="h-4 w-4" />,
    children: [],
  },
]

export function AmlSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["suspicious"])
  const [activeItem, setActiveItem] = useState("identify")

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <aside
      className={cn(
        "flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Top icon buttons */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200">
        <button className="flex items-center justify-center w-9 h-9 rounded bg-gray-200 hover:bg-gray-300">
          <FileText className="h-4 w-4 text-gray-600" />
        </button>
        <button className="flex items-center justify-center w-9 h-9 rounded bg-[#f0ad4e] hover:bg-[#ec971f]">
          <Building2 className="h-4 w-4 text-white" />
        </button>
        <button className="flex items-center justify-center w-9 h-9 rounded bg-[#5bc0de] hover:bg-[#46b8da]">
          <BarChart3 className="h-4 w-4 text-white" />
        </button>
        <button className="flex items-center justify-center w-9 h-9 rounded bg-[#5bc0de] hover:bg-[#46b8da]">
          <Settings className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Menu items */}
      <nav className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => {
                if (item.children) {
                  toggleExpand(item.id)
                } else {
                  setActiveItem(item.id)
                }
              }}
              className={cn(
                "flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors",
                !collapsed && "justify-between"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#5bc0de]">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </div>
              {!collapsed && item.children && (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-400 transition-transform",
                    expandedItems.includes(item.id) && "rotate-180"
                  )}
                />
              )}
            </button>

            {/* Sub menu */}
            {!collapsed &&
              item.children &&
              expandedItems.includes(item.id) && (
                <div className="bg-white">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setActiveItem(child.id)}
                      className={cn(
                        "flex items-center w-full pl-8 pr-3 py-2 text-sm transition-colors",
                        activeItem === child.id
                          ? "text-[#337ab7] bg-blue-50 border-l-2 border-[#337ab7]"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <span className="mr-2 text-gray-400">—</span>
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
          </div>
        ))}
      </nav>

      {/* Collapse button */}
      <div className="border-t border-gray-200 p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-50 mx-auto"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 text-gray-500 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>
    </aside>
  )
}
