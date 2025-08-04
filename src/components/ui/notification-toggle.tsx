import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"
import { 
  Bell, 
  BellOff, 
  Settings, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Volume2, 
  VolumeX,
  CheckCircle,
  AlertCircle,
  Info,
  X
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const NOTIFICATION_ITEMS = {
  general: [
    { icon: MessageSquare, label: "Messages", action: "messages" },
    { icon: Mail, label: "Email notifications", action: "email" },
    { icon: Smartphone, label: "Push notifications", action: "push" },
  ],
  settings: [
    { icon: Volume2, label: "Sound alerts", action: "sound" },
    { icon: Settings, label: "Notification settings", action: "settings" },
  ]
};

export const NotificationToggle = ({ 
  notifications = {
    unread: 3,
    total: 12,
    settings: {
      messages: true,
      email: true,
      push: false,
      sound: true
    }
  },
  onAction = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState(notifications.settings);

  // Reset when dropdown opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleToggle = (key: string) => {
    const newSettings = {
      ...notificationSettings,
      [key]: !notificationSettings[key as keyof typeof notificationSettings]
    };
    setNotificationSettings(newSettings);
    
    // Show toast notification
    toast.success(`${newSettings[key as keyof typeof notificationSettings] ? 'Enabled' : 'Disabled'}`, {
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${newSettings[key as keyof typeof notificationSettings] ? 'enabled' : 'disabled'}.`,
      duration: 2000,
    });
    
    onAction(`toggle-${key}`);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'mark-all-read':
        toast.success('Marked as Read', {
          description: 'All notifications marked as read.',
          duration: 2000,
        });
        onAction(action);
        break;
      case 'settings':
        toast.info('Settings', {
          description: 'Opening notification settings...',
          duration: 2000,
        });
        onAction(action);
        break;
      default:
        onAction(action);
    }
  };

  const renderMenuItem = (item: any, index: number) => (
    <DropdownMenuItem 
      key={index}
      className="p-3 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (item.action.startsWith('toggle-')) {
          const key = item.action.replace('toggle-', '');
          handleToggle(key);
        } else {
          handleAction(item.action);
        }
      }}
      onSelect={(e) => {
        e.preventDefault();
      }}
    >
      <span className="flex items-center gap-3 font-medium">
        <item.icon className="size-5 text-gray-500 dark:text-gray-400" />
        {item.label}
      </span>
      {item.action.startsWith('toggle-') && (
        <Switch 
          checked={notificationSettings[item.action.replace('toggle-', '') as keyof typeof notificationSettings] as boolean}
          className="ml-auto"
        />
      )}
    </DropdownMenuItem>
  );

  const renderNotificationItem = (notification: any, index: number) => (
    <DropdownMenuItem 
      key={index}
      className="p-3 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAction('mark-read');
      }}
    >
      <div className="flex items-start gap-3 w-full">
        <div className="flex-shrink-0">
          {notification.type === 'success' ? (
            <CheckCircle className="size-5 text-green-500" />
          ) : notification.type === 'error' ? (
            <AlertCircle className="size-5 text-red-500" />
          ) : (
            <Info className="size-5 text-blue-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {notification.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {notification.message}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {notification.time}
          </p>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
        )}
      </div>
    </DropdownMenuItem>
  );

  const sampleNotifications = [
    {
      id: 1,
      title: "New message from John",
      message: "Hey, how's the project going?",
      time: "2 min ago",
      type: "default",
      read: false
    },
    {
      id: 2,
      title: "Profile updated successfully",
      message: "Your profile has been updated.",
      time: "5 min ago",
      type: "success",
      read: false
    },
    {
      id: 3,
      title: "System maintenance",
      message: "Scheduled maintenance in 30 minutes.",
      time: "10 min ago",
      type: "error",
      read: true
    }
  ];

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
                     <Button
             variant="ghost"
             size="icon"
             className="relative h-10 w-10 rounded-full border border-gray-200 dark:border-[#333333] shadow-lg hover:shadow-xl transition-shadow duration-200"
           >
            <Bell className="size-5" />
            {notifications.unread > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                {notifications.unread > 9 ? '9+' : notifications.unread}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>

                 <DropdownMenuContent className="no-scrollbar w-[380px] rounded-2xl bg-gray-50 dark:bg-[#191919] p-0 border border-gray-200 dark:border-[#333333] shadow-2xl" align="end">
           <section className="bg-white/95 dark:bg-[#191919]/95 backdrop-blur-xl rounded-2xl p-1 shadow-lg border border-gray-200/30 dark:border-[#333333]/30">
            {/* Header */}
                         <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#333333]">
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Notifications</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {notifications.unread} unread, {notifications.total} total
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAction('mark-all-read');
                  }}
                  className="text-xs h-8 px-2"
                >
                  Mark all read
                </Button>
                                 <Button
                   variant="ghost"
                   size="sm"
                   onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     handleAction('settings');
                   }}
                   className="text-xs h-8 px-2 bg-white dark:bg-[#191919] border border-gray-200 dark:border-[#333333] rounded-lg"
                 >
                  <Settings className="size-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-64 overflow-y-auto">
              {sampleNotifications.map((notification, index) => (
                <div key={notification.id}>
                  {renderNotificationItem(notification, index)}
                  {index < sampleNotifications.length - 1 && (
                    <DropdownMenuSeparator className="mx-3" />
                  )}
                </div>
              ))}
            </div>

            {/* Quick Settings */}
                         <div className="p-2 border-t border-gray-200 dark:border-[#333333]">
              <DropdownMenuGroup>
                {NOTIFICATION_ITEMS.general.map((item, index) => (
                  <DropdownMenuItem 
                    key={index}
                    className="p-3 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 justify-between"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const key = item.action as keyof typeof notificationSettings;
                      handleToggle(key);
                    }}
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <span className="flex items-center gap-3 font-medium">
                      <item.icon className="size-5 text-gray-500 dark:text-gray-400" />
                      {item.label}
                    </span>
                    <Switch 
                      checked={notificationSettings[item.action as keyof typeof notificationSettings] as boolean}
                    />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

                             <DropdownMenuSeparator className="my-2 border-gray-200 dark:border-[#333333]" />
              
              <DropdownMenuGroup>
                {NOTIFICATION_ITEMS.settings.map((item, index) => (
                  <DropdownMenuItem 
                    key={index}
                    className="p-3 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0a0a0a] border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 justify-between"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (item.action === 'sound') {
                        handleToggle('sound');
                      } else {
                        handleAction(item.action);
                      }
                    }}
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <span className="flex items-center gap-3 font-medium">
                      <item.icon className="size-5 text-gray-500 dark:text-gray-400" />
                      {item.label}
                    </span>
                    {item.action === 'sound' && (
                      <Switch 
                        checked={notificationSettings.sound}
                      />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </div>
          </section>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NotificationToggle; 