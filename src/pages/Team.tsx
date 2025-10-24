export default function Team() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Team
        </h2>
        <p className="text-muted-foreground">
          Manage your team members and collaboration
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div>
              <h3 className="font-semibold text-foreground">John Doe</h3>
              <p className="text-sm text-muted-foreground">Project Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white font-semibold">
              AS
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Alice Smith</h3>
              <p className="text-sm text-muted-foreground">Developer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Away</span>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white font-semibold">
              BJ
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Bob Johnson</h3>
              <p className="text-sm text-muted-foreground">Designer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Offline</span>
          </div>
        </div>
      </div>
    </div>
  )
}
