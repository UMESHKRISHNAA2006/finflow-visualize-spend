
import React, { useState } from 'react';
import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Save,
  User,
  Lock,
  Bell, 
  CreditCard,
  Globe,
  Palette,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-slate-900">
      <AppSidebar />
      <div className="flex-1 ml-64 p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gradient">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </header>
        
        <main>
          <div className="flex flex-col gap-8">
            <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="bg-black/20 border border-white/10 mb-6">
                <TabsTrigger value="profile" className="data-[state=active]:bg-primary">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-primary">
                  <Lock className="mr-2 h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-primary">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="payment" className="data-[state=active]:bg-primary">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment
                </TabsTrigger>
                <TabsTrigger value="display" className="data-[state=active]:bg-primary">
                  <Palette className="mr-2 h-4 w-4" />
                  Display
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <ProfileSettings />
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <SecuritySettings />
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-6">
                <PaymentSettings />
              </TabsContent>
              
              <TabsContent value="display" className="space-y-6">
                <DisplaySettings />
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your account details and profile information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue="Umesh Krishnaa" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" defaultValue="umesh.krishnaa@example.com" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select defaultValue="engineering">
            <SelectTrigger id="department">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

const SecuritySettings = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your password and account security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input id="confirm-password" type="password" />
        </div>
        
        <div className="flex items-center justify-between space-y-0 pt-4">
          <div className="flex flex-col space-y-1">
            <span className="font-medium">Two-Factor Authentication</span>
            <span className="text-sm text-muted-foreground">Add an extra layer of security to your account</span>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};

const NotificationSettings = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Control how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-y-0">
          <div className="flex flex-col space-y-1">
            <span className="font-medium">Email Notifications</span>
            <span className="text-sm text-muted-foreground">Receive notifications via email</span>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between space-y-0">
          <div className="flex flex-col space-y-1">
            <span className="font-medium">Expense Approvals</span>
            <span className="text-sm text-muted-foreground">Get notified when an expense needs approval</span>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between space-y-0">
          <div className="flex flex-col space-y-1">
            <span className="font-medium">Monthly Report</span>
            <span className="text-sm text-muted-foreground">Receive monthly expense report summary</span>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between space-y-0">
          <div className="flex flex-col space-y-1">
            <span className="font-medium">Budget Alerts</span>
            <span className="text-sm text-muted-foreground">Get notified when nearing budget limits</span>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentSettings = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment and reimbursement methods</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Default Currency</Label>
          <Select defaultValue="inr">
            <SelectTrigger>
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
              <SelectItem value="usd">US Dollar ($)</SelectItem>
              <SelectItem value="eur">Euro (€)</SelectItem>
              <SelectItem value="gbp">British Pound (£)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Reimbursement Method</Label>
          <Select defaultValue="bank">
            <SelectTrigger>
              <SelectValue placeholder="Select Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank">Bank Transfer</SelectItem>
              <SelectItem value="payroll">Add to Payroll</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="account-name">Bank Account Name</Label>
          <Input id="account-name" defaultValue="Umesh Krishnaa" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="account-number">Bank Account Number</Label>
          <Input id="account-number" defaultValue="XXXX XXXX XXXX 5678" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ifsc">IFSC Code</Label>
          <Input id="ifsc" defaultValue="ABCD0001234" />
        </div>
      </CardContent>
    </Card>
  );
};

const DisplaySettings = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Display Settings</CardTitle>
        <CardDescription>Customize your app appearance and language</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Language</Label>
          <Select defaultValue="en-IN">
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-IN">English (India)</SelectItem>
              <SelectItem value="hi-IN">Hindi</SelectItem>
              <SelectItem value="ta-IN">Tamil</SelectItem>
              <SelectItem value="te-IN">Telugu</SelectItem>
              <SelectItem value="en-US">English (US)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Date Format</Label>
          <Select defaultValue="dd-mm-yyyy">
            <SelectTrigger>
              <SelectValue placeholder="Select Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
              <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
              <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between space-y-0">
          <div className="flex flex-col space-y-1">
            <span className="font-medium">Compact Mode</span>
            <span className="text-sm text-muted-foreground">Display more information on screen</span>
          </div>
          <Switch />
        </div>
        
        <div className="flex items-center justify-between space-y-0">
          <div className="flex flex-col space-y-1">
            <span className="font-medium">Animations</span>
            <span className="text-sm text-muted-foreground">Enable interface animations</span>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
