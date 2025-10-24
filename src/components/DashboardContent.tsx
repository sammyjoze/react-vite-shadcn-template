import { AnimatedAIChat } from "@/components/ui/animated-ai-chat"

export function DashboardContent() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, John!
            </h2>
          </div>
        </div>
      </div>
      
      {/* AI Chat Component */}
      <AnimatedAIChat />
    </div>
  )
}
