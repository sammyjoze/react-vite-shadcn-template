import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/ThemeToggle';
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
  Shield
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
  );
};

export default Dashboard; 