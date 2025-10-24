import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Settings,
  Menu,
  PanelLeft,
  X,
  Search,
  Globe,
  Sparkles,
  ChevronDown,
  Layers,
  TrendingUp,
  Users,
  MessageSquare,
  FileText,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UserDropdown } from "@/components/ui/user-dropdown"
import { NotificationToggle } from "@/components/ui/notification-toggle"
import ThemeToggle from "@/components/ThemeToggle"
import { cn } from "@/lib/utils"

// Sample data for sidebar navigation
const sidebarItems = [
  {
    title: "Home",
    icon: <Home />,
    isActive: false,
    path: "/dashboard",
  },
  {
    title: "Projects",
    icon: <Layers />,
    isActive: false,
    path: "/projects",
  },
  {
    title: "Analytics",
    icon: <TrendingUp />,
    isActive: false,
    path: "/analytics",
  },
  {
    title: "Team",
    icon: <Users />,
    isActive: false,
    path: "/team",
  },
  {
    title: "Messages",
    icon: <MessageSquare />,
    isActive: false,
    path: "/messages",
  },
  {
    title: "Files",
    icon: <FileText />,
    isActive: false,
    path: "/files",
  },
]

interface PersistentLayoutProps {
  children: React.ReactNode
}

export function PersistentLayout({ children }: PersistentLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [notifications, setNotifications] = useState(5)

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // Update active state based on current path
  const updatedSidebarItems = sidebarItems.map(item => ({
    ...item,
    isActive: location.pathname === item.path
  }))

  return (
    <TooltipProvider>
      <div className="relative min-h-screen overflow-hidden bg-background transition-all duration-500 ease-out">
        {/* Modern background with subtle pattern */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-muted/20 to-muted/40 transition-all duration-500 ease-out" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--foreground)/0.03),transparent_50%)] transition-all duration-500 ease-out" />

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Sidebar - Mobile */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r border-border transition-all duration-500 ease-out md:hidden",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg">
                    <Globe className="size-6 text-white" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 animate-pulse" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-foreground">YourApp</h2>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="rounded-xl hover:bg-muted">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
              </div>
            </div>

            <ScrollArea className="flex-1 px-3 py-2">
              <div className="space-y-1">
                {updatedSidebarItems.map((item) => (
                  <div key={item.title} className="mb-1">
                    <button
                      className={cn(
                        "flex w-full items-center rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-500 ease-out",
                        item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                      )}
                      onClick={() => {
                        navigate(item.path)
                        setMobileMenuOpen(false)
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-3">
              <div className="space-y-1">
                <button 
                  className={cn(
                    "flex w-full items-center rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted transition-all duration-500 ease-out",
                    location.pathname === '/settings' ? "bg-primary/10 text-primary" : ""
                  )}
                  onClick={() => {
                    navigate('/settings')
                    setMobileMenuOpen(false)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Desktop */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-30 hidden transform bg-card border-r border-border transition-all duration-500 ease-out md:block",
            sidebarOpen ? "w-64 translate-x-0" : "w-16 translate-x-0",
          )}
        >
          <div className="flex h-full flex-col">
            {/* Logo Section */}
            <div className={cn("p-6 transition-all duration-500 ease-out", sidebarOpen ? "px-6" : "px-3")}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg">
                    <Globe className="size-6 text-white" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 animate-pulse" />
                </div>
                <div className={cn("transition-all duration-500 ease-out overflow-hidden", sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0")}>
                  <h2 className="font-bold text-lg text-foreground whitespace-nowrap">YourApp</h2>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className={cn("px-3 py-2 transition-all duration-500 ease-out", sidebarOpen ? "block" : "hidden")}>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
              </div>
            </div>

            {/* Navigation Items */}
            <ScrollArea className="flex-1 px-3 py-2">
              <div className="space-y-1">
                {updatedSidebarItems.map((item) => (
                  <div key={item.title} className="mb-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={cn(
                            "flex w-full items-center rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-500 ease-out",
                            sidebarOpen ? "justify-between" : "justify-center",
                            item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                          )}
                          onClick={() => navigate(item.path)}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <span className={cn("transition-all duration-500 ease-out overflow-hidden whitespace-nowrap", sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0")}>
                              {item.title}
                            </span>
                          </div>
                        </button>
                      </TooltipTrigger>
                      {!sidebarOpen && (
                        <TooltipContent side="right" className="ml-2">
                          <p>{item.title}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Settings Section */}
            <div className="border-t border-border p-3">
              <div className="space-y-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className={cn(
                        "flex w-full items-center rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted transition-all duration-500 ease-out",
                        sidebarOpen ? "justify-start gap-3" : "justify-center",
                        location.pathname === '/settings' ? "bg-primary/10 text-primary" : ""
                      )}
                      onClick={() => navigate('/settings')}
                    >
                      <Settings className="h-5 w-5" />
                      <span className={cn("transition-all duration-500 ease-out overflow-hidden whitespace-nowrap", sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0")}>
                        Settings
                      </span>
                    </button>
                  </TooltipTrigger>
                  {!sidebarOpen && (
                    <TooltipContent side="right" className="ml-2">
                      <p>Settings</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={cn("min-h-screen transition-all duration-500 ease-out", sidebarOpen ? "md:pl-64" : "md:pl-16")}>
          <header className="sticky top-0 z-10 flex h-16 items-center gap-3 bg-background/95 backdrop-blur-xl shadow-lg border-b border-border px-6 transition-all duration-500 ease-out">
            <Button variant="ghost" size="icon" className="md:hidden rounded-xl hover:bg-muted" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex rounded-xl hover:bg-muted" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <PanelLeft className="h-5 w-5" />
            </Button>
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-xl font-bold text-foreground">
                {location.pathname === '/dashboard' ? 'Dashboard' :
                 location.pathname === '/settings' ? 'Settings' :
                 location.pathname === '/projects' ? 'Projects' :
                 location.pathname === '/analytics' ? 'Analytics' :
                 location.pathname === '/team' ? 'Team' :
                 location.pathname === '/messages' ? 'Messages' :
                 location.pathname === '/files' ? 'Files' :
                 'YourApp'}
              </h1>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <NotificationToggle 
                  notifications={{
                    unread: notifications,
                    total: 12,
                    settings: {
                      messages: true,
                      email: true,
                      push: false,
                      sound: true
                    }
                  }}
                  onAction={(action) => {
                    console.log('Notification action:', action);
                    if (action === 'mark-all-read') {
                      setNotifications(0);
                    }
                  }}
                />

                <UserDropdown 
                  user={{
                    name: "John Doe",
                    username: "@johndoe",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
                    initials: "JD",
                    status: "online"
                  }}
                  onAction={(action) => {
                    switch (action) {
                      case "save-profile":
                        console.log("Profile saved");
                        break;
                      case "deactivate":
                        console.log("Deactivate clicked");
                        break;
                      case "upgrade":
                        console.log("Upgrade clicked");
                        break;
                      case "help":
                        console.log("Help clicked");
                        break;
                      case "logout":
                        console.log("Logout clicked");
                        break;
                    }
                  }}
                />
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 md:p-8 bg-background transition-all duration-500 ease-out">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
