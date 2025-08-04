import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"
import { User, HelpCircle, LogOut, Crown, ArrowLeft, Camera, Shield, AlertTriangle, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const MENU_ITEMS = {
  profile: [
    { icon: User, label: "Your profile", action: "profile" },
  ],
  support: [
    { 
      icon: HelpCircle, 
      label: "Get help", 
      action: "help",
    }
  ],
  account: [
    { icon: LogOut, label: "Log out", action: "logout" }
  ]
};

const PREMIUM_ITEM = {
  icon: Crown, 
  label: "Upgrade to Pro", 
  action: "upgrade",
  iconClass: "text-amber-600",
  badge: { text: "20% off", className: "bg-amber-600 text-white text-[11px]" }
};

export const UserDropdown = ({ 
  user = {
    name: "John Doe",
    username: "@johndoe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    initials: "JD",
    status: "online"
  },
  onAction = () => {},
  promoDiscount = "20% off"
}) => {
  const [currentView, setCurrentView] = useState<'main' | 'profile'>('main');
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [profileData, setProfileData] = useState({
    name: user.name,
    username: user.username,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });



  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Show toast notification for theme change
    toast.success(`${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, {
      description: `Theme switched to ${newTheme} mode.`,
      duration: 2000,
    });
  };

  // Reset to main view when dropdown opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setCurrentView('main');
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'profile':
        setCurrentView('profile');
        break;
      case 'upgrade':
        toast.info('Upgrade to Pro', {
          description: 'Redirecting to upgrade page...',
          duration: 3000,
        });
        onAction(action);
        break;
      case 'help':
        toast.info('Get Help', {
          description: 'Opening help center...',
          duration: 2000,
        });
        onAction(action);
        break;
      case 'logout':
        toast.warning('Logging Out', {
          description: 'You will be redirected to the login page.',
          duration: 3000,
        });
        onAction(action);
        break;
      case 'save-profile':
        toast.success('Profile Updated', {
          description: 'Your profile has been successfully updated.',
          duration: 3000,
        });
        onAction(action);
        break;
      case 'deactivate':
        toast.error('Account Deactivated', {
          description: 'Your account has been temporarily deactivated.',
          duration: 4000,
        });
        onAction(action);
        break;
      default:
        onAction(action);
    }
  };

  const renderMenuItem = (item, index) => (
    <DropdownMenuItem 
      key={index}
             className={cn(
         item.badge ? "justify-between" : "", 
         "p-3 rounded-xl cursor-pointer border border-transparent transition-all duration-200 hover:bg-gray-100 dark:hover:bg-[#0a0a0a] hover:border-[#0a0a0a] dark:hover:border-[#0a0a0a]"
       )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (item.action === 'profile') {
          setCurrentView('profile');
        } else {
          handleAction(item.action);
        }
      }}
      onSelect={(e) => {
        e.preventDefault();
      }}
    >
      <span className="flex items-center gap-3 font-medium">
        <item.icon
          className={`size-5 ${item.iconClass || "text-gray-500 dark:text-gray-400"}`}
        />
        {item.label}
      </span>
      {item.badge && (
        <Badge className={item.badge.className}>
          {promoDiscount || item.badge.text}
        </Badge>
      )}
    </DropdownMenuItem>
  );

  const getStatusColor = (status) => {
    const colors = {
      online: "text-green-600 bg-green-100 border-green-300 dark:text-green-400 dark:bg-green-900/30 dark:border-green-500/50",
      offline: "text-gray-600 bg-gray-100 border-gray-300 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600",
      busy: "text-red-600 bg-red-100 border-red-300 dark:text-red-400 dark:bg-red-900/30 dark:border-red-500/50"
    };
    return colors[status.toLowerCase()] || colors.online;
  };

  const renderProfileView = () => (
    <div className="space-y-4">
      {/* Header with back button */}
                           <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-[#333333]">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentView('main');
          }}
          className="p-1 h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Edit Profile</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Update your information</p>
        </div>
      </div>

                    {/* Profile Picture Section */}
                               <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-[#333333] bg-gray-50/80 dark:bg-[#191919]/80 backdrop-blur-sm shadow-sm">
                 <Avatar className="size-16 border border-gray-200 dark:border-gray-600">
          <AvatarImage src={user.avatar} alt="Profile" />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Label htmlFor="profile-picture" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Camera className="size-4" />
            Profile Picture
          </Label>
                                           <Input 
              id="profile-picture" 
              type="file" 
              accept="image/*" 
                             className="mt-2 rounded-lg border-gray-200 dark:border-[#333333] bg-white dark:bg-gray-700"
            />
        </div>
      </div>

      {/* User Information */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </Label>
                                           <Input 
              id="name" 
              value={profileData.name}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              className="rounded-lg border-[#333333] bg-white dark:bg-gray-700"
            />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </Label>
                                           <Input 
              id="username" 
              value={profileData.username}
              onChange={(e) => setProfileData({...profileData, username: e.target.value})}
              className="rounded-lg border-[#333333] bg-white dark:bg-gray-700"
            />
        </div>
      </div>

                    {/* Password Section */}
               <div className="space-y-4 p-4 rounded-xl border border-[#333333] bg-gray-50/80 dark:bg-[#191919]/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-gray-500 dark:text-gray-400" />
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Change Password</h4>
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Password
            </Label>
                                                   <Input 
                id="current-password" 
                type="password" 
                value={profileData.currentPassword}
                onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                className="rounded-lg border-gray-200 dark:border-[#333333] bg-white dark:bg-gray-700"
              />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </Label>
                                                   <Input 
                id="new-password" 
                type="password" 
                value={profileData.newPassword}
                onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                className="rounded-lg border-gray-200 dark:border-[#333333] bg-white dark:bg-gray-700"
              />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm New Password
            </Label>
                                                   <Input 
                id="confirm-password" 
                type="password" 
                value={profileData.confirmPassword}
                onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                className="rounded-lg border-gray-200 dark:border-[#333333] bg-white dark:bg-gray-700"
              />
          </div>
        </div>
      </div>

                    {/* Danger Zone */}
        <div className="rounded-xl border border-gray-200 dark:border-[#333333] bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm shadow-sm p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-red-600 dark:text-red-400" />
              <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">Danger Zone</h4>
            </div>
            <p className="text-xs text-red-600 dark:text-red-300">
              Temporarily deactivate your account. You can reactivate it at any time.
            </p>
          </div>
                     <Button 
             variant="destructive" 
             size="sm"
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               handleAction('deactivate');
             }}
             className="rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
           >
            Deactivate
          </Button>
        </div>
      </div>

             {/* Save Button */}
       <div className="pt-2">
         <Button 
           className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAction('save-profile');
            setCurrentView('main');
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
                     <Avatar className="cursor-pointer size-10 border border-white dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

                 <DropdownMenuContent className="no-scrollbar w-[380px] rounded-2xl bg-gray-50 dark:bg-[#191919] p-0 border border-gray-200 dark:border-[#333333] shadow-2xl" align="end">
           <section className="bg-white/95 dark:bg-[#191919]/95 backdrop-blur-xl rounded-2xl p-1 shadow-lg border border-gray-200/30 dark:border-[#333333]/30">
            {currentView === 'main' ? (
              <>
                                 <div className="flex items-center p-4 border-b border-gray-200 dark:border-[#333333]">
                  <div className="flex-1 flex items-center gap-3">
                                         <Avatar className="cursor-pointer size-12 border border-gray-200 dark:border-gray-600 shadow-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{user.name}</h3>
                      <p className="text-muted-foreground text-xs">{user.username}</p>
                    </div>
                  </div>
                                     <Badge className={`${getStatusColor(user.status)} border border-gray-200 dark:border-gray-600 text-[11px] rounded-lg capitalize shadow-sm`}>
                    {user.status}
                  </Badge>
                </div>

                <div className="p-2">
                  <DropdownMenuGroup>
                    {MENU_ITEMS.profile.map(renderMenuItem)}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuGroup>
                    {MENU_ITEMS.support.map(renderMenuItem)}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuGroup>
                                         <DropdownMenuItem 
                       className="p-3 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0a0a0a] border border-transparent hover:border-[#0a0a0a] dark:hover:border-[#0a0a0a] transition-all duration-200 justify-between"
                       onClick={(e) => {
                         e.preventDefault();
                         e.stopPropagation();
                         toggleTheme();
                       }}
                       onSelect={(e) => {
                         e.preventDefault();
                       }}
                     >
                      <span className="flex items-center gap-3 font-medium">
                        {theme === 'dark' ? (
                          <Sun className="size-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <Moon className="size-5 text-gray-500 dark:text-gray-400" />
                        )}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </span>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-yellow-500 dark:bg-yellow-500 transition-colors">
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </div>
              </>
            ) : (
              <div className="p-4">
                {renderProfileView()}
              </div>
            )}
          </section>

                     {currentView === 'main' && (
             <section className="mt-1 p-2 rounded-2xl">
               <DropdownMenuGroup>
                 {renderMenuItem(PREMIUM_ITEM, 'premium')}
               </DropdownMenuGroup>
               <DropdownMenuSeparator className="my-2" />
               <DropdownMenuGroup>
                 {MENU_ITEMS.account.map((item, index) => renderMenuItem(item, index))}
               </DropdownMenuGroup>
             </section>
           )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDropdown; 