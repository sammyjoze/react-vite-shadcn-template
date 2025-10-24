export default function Messages() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Messages
        </h2>
        <p className="text-muted-foreground">
          Communicate with your team and clients
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">Recent Conversations</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                  JD
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">Hey, how's the project going?</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white text-xs font-semibold">
                  AS
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Alice Smith</p>
                  <p className="text-xs text-muted-foreground">The new feature is ready!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="p-6 rounded-lg border border-border bg-card h-96">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                JD
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Chat interface would go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
