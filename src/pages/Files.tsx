export default function Files() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Files
        </h2>
        <p className="text-muted-foreground">
          Manage and organize your files and documents
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-lg border border-border bg-card">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground mb-1">Project Brief.pdf</h3>
          <p className="text-xs text-muted-foreground mb-2">2.4 MB</p>
          <p className="text-xs text-muted-foreground">Modified 2 hours ago</p>
        </div>
        
        <div className="p-6 rounded-lg border border-border bg-card">
          <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground mb-1">Analytics Report.xlsx</h3>
          <p className="text-xs text-muted-foreground mb-2">1.8 MB</p>
          <p className="text-xs text-muted-foreground">Modified yesterday</p>
        </div>
        
        <div className="p-6 rounded-lg border border-border bg-card">
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground mb-1">Design Mockup.png</h3>
          <p className="text-xs text-muted-foreground mb-2">5.2 MB</p>
          <p className="text-xs text-muted-foreground">Modified 3 days ago</p>
        </div>
        
        <div className="p-6 rounded-lg border border-border bg-card">
          <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6v10a1 1 0 102 0V6a1 1 0 10-2 0zm4 0v10a1 1 0 102 0V6a1 1 0 10-2 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground mb-1">Archive.zip</h3>
          <p className="text-xs text-muted-foreground mb-2">12.1 MB</p>
          <p className="text-xs text-muted-foreground">Modified 1 week ago</p>
        </div>
      </div>
    </div>
  )
}
