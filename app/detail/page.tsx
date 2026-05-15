"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, ChevronLeft, ChevronRight, List, Eye, ArrowLeftRight, BarChart3, Users, Wallet, Building2, Search } from "lucide-react"
import { AmlHeader } from "@/components/aml-header"
import { AmlSidebar } from "@/components/aml-sidebar"
import { AmlAssistantButton } from "@/components/aml-assistant-button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const topTabs = [
  { id: "home", label: "首页", closable: false },
  { id: "suspicious", label: "可疑行为甄别", closable: true },
]

const subTabs = [
  { id: "case", label: "可疑案例甄别", icon: Eye },
  { id: "transaction", label: "交易案例甄别", icon: ArrowLeftRight },
  { id: "counterparty-tx", label: "本行交易对手客户交易信息", icon: BarChart3 },
  { id: "customer", label: "客户信息", icon: Users },
  { id: "account", label: "账户信息", icon: Wallet },
  { id: "counterparty", label: "本行交易对手客户信息", icon: Building2 },
]

export default function DetailPage() {
  const router = useRouter()
  const [activeTopTab, setActiveTopTab] = useState("suspicious")

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AmlHeader />
      <div className="flex flex-1 overflow-hidden">
        <AmlSidebar />
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Top-level tab bar (same as main page) */}
          <div className="flex items-center justify-between px-4 bg-[#f5f5f5] border-b border-gray-200">
            <div className="flex items-center">
              {topTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === "home") {
                      router.push("/")
                    } else {
                      setActiveTopTab(tab.id)
                    }
                  }}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2.5 text-sm border-b-2 transition-colors",
                    activeTopTab === tab.id
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

          {/* Content area with sub-tabs */}
          <div className="flex-1 overflow-auto p-4">
            <Tabs defaultValue="case" className="gap-0">
              <TabsList className="bg-white pt-1 px-1 pb-0 rounded-none inline-flex w-auto justify-start">
                {subTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="text-sm text-gray-400 whitespace-nowrap flex-none rounded-none border border-gray-200 data-[state=active]:bg-white data-[state=active]:text-[#337ab7] data-[state=active]:shadow-sm"
                  >
                    <tab.icon className="h-3.5 w-3.5 mr-1" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab 1: 可疑案例甄别 */}
              <TabsContent value="case" className="mt-0 pl-1 -mt-px">
                <div className="bg-white border border-gray-200 p-8">
                  <h2 className="text-center text-xl font-bold text-gray-800 mb-4">
                    可疑案例甄别报告
                  </h2>
                  <p className="text-sm text-gray-600 mb-6 text-center space-x-6">
                    <span><span className="text-xs text-gray-400 font-bold">编号：</span><span className="text-xs text-gray-400">ALT001</span></span>
                    <span><span className="text-xs text-gray-400 font-bold">状态：</span><span className="text-xs text-gray-400">待处理</span></span>
                    <span><span className="text-xs text-gray-400 font-bold">数据时间：</span><span className="text-xs text-gray-400">2022-07-20</span></span>
                  </p>
                  <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                    <p>
                      系统监测该可疑案件疑似涉罪类型：<span className="text-red-600 font-bold">涉嫌其他犯罪的可疑行为</span>，可疑情况与模型：《对私异常行为监测模型》相似，触发了模型中："<span className="text-red-600 font-bold">对私客户交易金额巨大</span>""<span className="text-red-600 font-bold">对私客户长期闲置原因不明的突然启用或平常流量小，且短期内有大量本币资金收付的可疑线索</span>"；
                    </p>
                    <p>
                      案件涉及 <Users className="h-3.5 w-3.5 inline text-blue-600 mr-0.5" /><span className="text-blue-600 font-bold">1名可疑客户</span>，其中主客户：<span className="text-blue-600 font-bold">（30030***37）</span>，持有； 职业：其他专业技术人员职业描述：；客户风险等级：；风险信息：；
                    </p>
                    <p>
                      案件涉及 <Wallet className="h-3.5 w-3.5 inline text-blue-600 mr-0.5" /><span className="text-blue-600 font-bold">4笔交易</span>，交易检测周期1天 2022-07-20至2022-07-20， 交易累计金额： 1,501,305.50。
                    </p>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 border-t-0 px-3 py-2">
                  <h3 className="text-sm font-medium text-[#337ab7] flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    甄别结论
                  </h3>
                </div>
                <div className="bg-white border border-gray-200 border-t-0 px-3 py-2">
                  <div className="px-[15%]">
                  <table className="w-full">
                    <tbody className="[&_tr:not(:last-child)]:border-b [&_tr:not(:last-child)]:border-transparent">
                      <tr>
                        <td className="w-[11em] text-right pr-3 py-1 align-top">
                          <label className="text-sm text-gray-800 whitespace-nowrap leading-8">交易特征：</label>
                        </td>
                        <td className="w-1/2 py-1">
                          <textarea
                            rows={4}
                            className="w-full text-xs text-gray-400 border border-gray-200 rounded px-2 py-1 resize-none focus:outline-none focus:border-gray-300"
                            defaultValue="（KY03）客户短期内频繁收取与其经营业务名下无关或与其职业身份明显不匹配的汇款"
                          />
                        </td>
                        <td className="pl-3 py-1">
                          <Search className="h-3.5 w-3.5 text-[#337ab7] mt-1" />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[11em] text-right pr-3 py-1 align-top">
                          <label className="text-sm text-gray-800 whitespace-nowrap leading-8">涉罪类型：</label>
                        </td>
                        <td className="w-1/2 py-1">
                          <textarea
                            rows={4}
                            className="w-full text-xs text-gray-400 border border-gray-200 rounded px-2 py-1 resize-none focus:outline-none focus:border-gray-300"
                            defaultValue="涉嫌其他犯罪的可疑交易行为"
                          />
                        </td>
                        <td className="pl-3 py-1">
                          <Search className="h-3.5 w-3.5 text-[#337ab7] mt-1" />
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[11em] text-right pr-3 py-1">
                          <label className="text-sm text-gray-800 whitespace-nowrap">报送方向：</label>
                        </td>
                        <td className="w-1/2 py-1">
                          <select className="w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-gray-300">
                            <option>报告中国反洗钱监测分析中心</option>
                          </select>
                        </td>
                        <td className="pl-3 py-1" />
                      </tr>
                      <tr>
                        <td className="w-[11em] text-right pr-3 py-1">
                          <label className="text-sm text-gray-800 whitespace-nowrap">可疑交易报告紧急程度：</label>
                        </td>
                        <td className="w-1/2 py-1">
                          <select className="w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-gray-300">
                            <option>非特别紧急</option>
                          </select>
                        </td>
                        <td className="pl-3 py-1" />
                      </tr>
                      <tr>
                        <td className="w-[11em] text-right pr-3 py-1">
                          <label className="text-sm text-gray-800 whitespace-nowrap">可疑交易报告触发：</label>
                        </td>
                        <td className="w-1/2 py-1">
                          <select className="w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-gray-300">
                            <option>模型筛选</option>
                          </select>
                        </td>
                        <td className="pl-3 py-1" />
                      </tr>
                      <tr>
                        <td className="w-[11em] text-right pr-3 py-1 align-top">
                          <label className="text-sm text-gray-800 whitespace-nowrap leading-8">资金交易与客户行为情况：</label>
                        </td>
                        <td className="w-1/2 py-1">
                          <textarea
                            rows={4}
                            className="w-full text-xs text-gray-400 border border-gray-200 rounded px-2 py-1 resize-none focus:outline-none focus:border-gray-300"
                            defaultValue=""
                          />
                        </td>
                        <td className="pl-3 py-1">
                          <div className="flex flex-col gap-1 text-xs text-gray-600">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input type="checkbox" className="h-3 w-3" /> 交易监测周期
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input type="checkbox" className="h-3 w-3" /> 提取交易情况描述
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input type="checkbox" className="h-3 w-3" /> 交易行为分析
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-[11em] text-right pr-3 py-1 align-top">
                          <label className="text-sm text-gray-800 whitespace-nowrap leading-8">疑点分析：</label>
                        </td>
                        <td className="w-1/2 py-1">
                          <textarea
                            rows={4}
                            className="w-full text-xs text-gray-400 border border-gray-200 rounded px-2 py-1 resize-none focus:outline-none focus:border-gray-300"
                            defaultValue=""
                          />
                        </td>
                       
                      </tr>
                      <tr>
                        <td className="w-[11em] text-right pr-3 py-1 align-top">
                          <label className="text-sm text-gray-800 whitespace-nowrap leading-8">案件甄别结论：</label>
                        </td>
                        <td className="w-1/2 py-1">
                          <textarea
                            rows={4}
                            className="w-full text-xs text-gray-400 border border-gray-200 rounded px-2 py-1 resize-none focus:outline-none focus:border-gray-300"
                            defaultValue=""
                          />
                        </td>
                       
                      </tr>
                      <tr>
                        <td className="w-[11em] text-right pr-3 py-1 align-top">
                          <label className="text-sm text-gray-800 whitespace-nowrap leading-8">处理结论分类：</label>
                        </td>
                        <td className="w-1/2 py-1">
                          <div className="flex items-center gap-6 leading-8">
                            <label className="flex items-center gap-1 cursor-pointer text-sm text-gray-800">
                              <input type="radio" name="conclusion" value="上报" className="h-3 w-3" /> 上报
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer text-sm text-gray-800">
                              <input type="radio" name="conclusion" value="排除" className="h-3 w-3" /> 排除
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer text-sm text-gray-800">
                              <input type="radio" name="conclusion" value="跟踪" className="h-3 w-3" /> 跟踪
                            </label>
                          </div>
                        </td>
                       
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 2: 交易案例甄别 */}
              <TabsContent value="transaction" className="mt-0 pl-1 -mt-px">
                <div className="bg-white border border-gray-200 p-8">
                  <div className="text-center text-gray-400 py-16">
                    <p className="text-lg">交易案例甄别</p>
                    <p className="text-sm mt-2">功能开发中</p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 3: 本行交易对手客户交易信息 */}
              <TabsContent value="counterparty-tx" className="mt-0 pl-1 -mt-px">
                <div className="bg-white border border-gray-200 p-8">
                  <div className="text-center text-gray-400 py-16">
                    <p className="text-lg">本行交易对手客户交易信息</p>
                    <p className="text-sm mt-2">功能开发中</p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 4: 客户信息 */}
              <TabsContent value="customer" className="mt-0 pl-1 -mt-px">
                <div className="bg-white border border-gray-200 p-8">
                  <div className="text-center text-gray-400 py-16">
                    <p className="text-lg">客户信息</p>
                    <p className="text-sm mt-2">功能开发中</p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 5: 账户信息 */}
              <TabsContent value="account" className="mt-0 pl-1 -mt-px">
                <div className="bg-white border border-gray-200 p-8">
                  <div className="text-center text-gray-400 py-16">
                    <p className="text-lg">账户信息</p>
                    <p className="text-sm mt-2">功能开发中</p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 6: 本行交易对手客户信息 */}
              <TabsContent value="counterparty" className="mt-0 pl-1 -mt-px">
                <div className="bg-white border border-gray-200 p-8">
                  <div className="text-center text-gray-400 py-16">
                    <p className="text-lg">本行交易对手客户信息</p>
                    <p className="text-sm mt-2">功能开发中</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* 甄别结论 */}
            <div className="pl-1 -mt-px">
              <div className="bg-white border border-gray-200 p-4">
                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    className="px-4 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                  >
                    提交
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="px-4 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                  >
                    返回
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AmlAssistantButton />
    </div>
  )
}
