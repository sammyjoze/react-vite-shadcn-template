'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import NotificationToggle from '@/components/ui/notification-toggle';

export default function NotificationToggleDemo() {
  const [notifications, setNotifications] = useState({
    unread: 3,
    total: 12,
    settings: {
      messages: true,
      email: true,
      push: false,
      sound: true
    }
  });

  const handleAction = (action: string) => {
    console.log('Notification action:', action);
    
    if (action.startsWith('toggle-')) {
      const key = action.replace('toggle-', '');
      setNotifications(prev => ({
        ...prev,
        settings: {
          ...prev.settings,
          [key]: !prev.settings[key as keyof typeof prev.settings]
        }
      }));
    }
  };

  const addNotification = () => {
    setNotifications(prev => ({
      ...prev,
      unread: prev.unread + 1,
      total: prev.total + 1
    }));
  };

  const clearNotifications = () => {
    setNotifications(prev => ({
      ...prev,
      unread: 0,
      total: 0
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2">Notification Toggle Demo</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Click the bell icon to see the notification dropdown
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={addNotification}
            className="text-xs"
          >
            Add Notification
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearNotifications}
            className="text-xs"
          >
            Clear All
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <NotificationToggle 
          notifications={notifications}
          onAction={handleAction}
        />
      </div>

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">Current Settings:</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>Messages: {notifications.settings.messages ? '✅' : '❌'}</div>
          <div>Email: {notifications.settings.email ? '✅' : '❌'}</div>
          <div>Push: {notifications.settings.push ? '✅' : '❌'}</div>
          <div>Sound: {notifications.settings.sound ? '✅' : '❌'}</div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Unread: {notifications.unread} | Total: {notifications.total}
        </div>
      </div>
    </div>
  );
} 