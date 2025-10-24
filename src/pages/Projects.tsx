export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Projects
        </h2>
        <p className="text-muted-foreground">
          Manage and organize your projects
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border border-border bg-card">
          <h3 className="font-semibold text-foreground mb-2">Project Alpha</h3>
          <p className="text-sm text-muted-foreground mb-4">A comprehensive web application</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">In Progress</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border border-border bg-card">
          <h3 className="font-semibold text-foreground mb-2">Project Beta</h3>
          <p className="text-sm text-muted-foreground mb-4">Mobile app development</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Planning</span>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border border-border bg-card">
          <h3 className="font-semibold text-foreground mb-2">Project Gamma</h3>
          <p className="text-sm text-muted-foreground mb-4">Data analysis dashboard</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Completed</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
