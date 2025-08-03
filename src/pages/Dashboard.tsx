import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/ThemeToggle';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  LogOut, 
  User, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  Users as UsersIcon,
  Calendar,
  Target,
  Award,
  Sparkles,
  Home,
  Shield,
  LayoutDashboard,
  UserCog,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    }
  ];

  const stats = [
    {
      title: "Total Projects",
      value: "12",
      change: "+2",
      icon: Target,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+12%",
      icon: UsersIcon,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+8%",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Tasks Completed",
      value: "89",
      change: "+15",
      icon: Award,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const quickActions = [
    {
      title: "Create Project",
      description: "Start a new project",
      icon: Target,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "View Analytics",
      description: "Check your performance",
      icon: BarChart3,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Team Settings",
      description: "Manage your team",
      icon: Settings,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {sidebarOpen ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {sidebarLinks.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-start gap-2 group/sidebar py-2 w-full">
                    <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <motion.span
                      animate={{
                        display: sidebarOpen ? "inline-block" : "none",
                        opacity: sidebarOpen ? 1 : 0,
                      }}
                      className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                    >
                      {user?.name || "User"}
                    </motion.span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <UserCog className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6 sm:py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <User className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Welcome back, {user?.name || 'User'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <ThemeToggle />
                <Button 
                  onClick={logout} 
                  variant="outline" 
                  size="sm" 
                  className="sm:size-default hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">Logout</span>
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card 
                  key={stat.title}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                          <span className="text-xs text-muted-foreground ml-1">from last month</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full bg-gradient-to-r ${stat.gradient} group-hover:scale-110 transition-transform duration-200`}>
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {quickActions.map((action, index) => (
                  <Card 
                    key={action.title}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${action.gradient} group-hover:scale-110 transition-transform duration-200`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-200">
                      <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">Analytics</CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    View your performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-24 sm:h-32 flex items-center justify-center text-muted-foreground text-sm sm:text-base">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                      <p>Analytics content will go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 group-hover:scale-110 transition-transform duration-200">
                      <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">Projects</CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    Manage your active projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-24 sm:h-32 flex items-center justify-center text-muted-foreground text-sm sm:text-base">
                    <div className="text-center">
                      <Target className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                      <p>Projects content will go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-200">
                      <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">Settings</CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    Configure your account settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-24 sm:h-32 flex items-center justify-center text-muted-foreground text-sm sm:text-base">
                    <div className="text-center">
                      <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                      <p>Settings content will go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20">
      <div className="relative">
        <Globe className="h-5 w-5 text-yellow-500" />
        <Sparkles className="absolute -top-1 -right-1 h-2 w-2 text-yellow-500 animate-pulse" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        YourApp
      </motion.span>
    </div>
  );
};

const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20">
      <div className="relative">
        <Globe className="h-5 w-5 text-yellow-500" />
        <Sparkles className="absolute -top-1 -right-1 h-2 w-2 text-yellow-500 animate-pulse" />
      </div>
    </div>
  );
};

export default Dashboard; 