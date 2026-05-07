import { AmlHeader } from "@/components/aml-header"
import { AmlSidebar } from "@/components/aml-sidebar"
import { AmlContent } from "@/components/aml-content"
import { AmlAssistantButton } from "@/components/aml-assistant-button"

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AmlHeader />
      <div className="flex flex-1 overflow-hidden">
        <AmlSidebar />
        <AmlContent />
      </div>
      <AmlAssistantButton />
    </div>
  )
}
