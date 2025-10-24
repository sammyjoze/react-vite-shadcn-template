import React, { useState } from 'react'
import { Palette, CreditCard, Database, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTheme } from '@/contexts/ThemeContext'
import ThemeToggle from '@/components/ThemeToggle'

export default function Settings() {
  const { theme } = useTheme()
  
  // Settings state
  const [appSettings, setAppSettings] = useState({
    notifications: true,
    analytics: true,
  })
  
  const [appearance, setAppearance] = useState({
    theme: theme,
    fontSize: 'medium',
  })

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="app" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="app" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            App
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Data
          </TabsTrigger>
        </TabsList>

        {/* App Settings Tab */}
        <TabsContent value="app" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Database className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle>App Settings</CardTitle>
                  <CardDescription>Basic application preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive app notifications</p>
                </div>
                <Switch 
                  id="notifications"
                  checked={appSettings.notifications}
                  onCheckedChange={(checked) => setAppSettings(prev => ({ ...prev, notifications: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="analytics">Analytics</Label>
                  <p className="text-sm text-muted-foreground">Help improve the app with anonymous data</p>
                </div>
                <Switch 
                  id="analytics"
                  checked={appSettings.analytics}
                  onCheckedChange={(checked) => setAppSettings(prev => ({ ...prev, analytics: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings Tab */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CreditCard className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <CardTitle>Payment & Plans</CardTitle>
                  <CardDescription>Manage your subscription and billing</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Current Plan</h3>
                  <Badge variant="secondary">Free</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">2.5GB storage used</p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Upgrade to Pro
                  <Badge variant="secondary" className="ml-2">-20%</Badge>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Palette className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how the app looks</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
                </div>
                <ThemeToggle />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <select 
                  id="font-size"
                  aria-label="Font size setting"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={appearance.fontSize}
                  onChange={(e) => setAppearance(prev => ({ ...prev, fontSize: e.target.value }))}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management Tab */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Download className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export or delete your data</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Export Data</Label>
                  <p className="text-sm text-muted-foreground">Download a copy of your data</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Delete Account</Label>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
