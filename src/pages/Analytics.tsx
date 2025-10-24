export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Analytics
        </h2>
        <p className="text-muted-foreground">
          View your performance metrics and insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 rounded-lg border border-border bg-card">
          <h3 className="text-2xl font-bold text-foreground">1,234</h3>
          <p className="text-sm text-muted-foreground">Total Views</p>
        </div>
        
        <div className="p-6 rounded-lg border border-border bg-card">
          <h3 className="text-2xl font-bold text-foreground">567</h3>
          <p className="text-sm text-muted-foreground">Unique Visitors</p>
        </div>
        
        <div className="p-6 rounded-lg border border-border bg-card">
          <h3 className="text-2xl font-bold text-foreground">89</h3>
          <p className="text-sm text-muted-foreground">Conversions</p>
        </div>
        
        <div className="p-6 rounded-lg border border-border bg-card">
          <h3 className="text-2xl font-bold text-foreground">7.2%</h3>
          <p className="text-sm text-muted-foreground">Conversion Rate</p>
        </div>
      </div>
      
      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="font-semibold text-foreground mb-4">Performance Overview</h3>
        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  )
}
