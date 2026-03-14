import { User, Mail, Phone, MapPin, Building, Shield, Bell, Lock, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { toast } from "sonner";

export function Profile() {
  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleSavePreferences = () => {
    toast.success("Preferences saved!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and system preferences</p>
      </div>

      {/* Profile Information */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-[#4F46E5] text-white text-2xl">
                RR
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">Rudra Rana</h3>
              <p className="text-sm text-gray-600">Inventory Manager</p>
              <Button variant="outline" size="sm" className="mt-2">
                Change Photo
              </Button>
            </div>
          </div>

          <Separator />

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="first-name" defaultValue="" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="last-name" defaultValue="" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="email" type="email" defaultValue="" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="phone" defaultValue="" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="department" defaultValue="Warehouse Operations" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="location" defaultValue="Main Warehouse" className="pl-10" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveProfile} className="bg-[#4F46E5] hover:bg-[#4338CA]">
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-[#4F46E5]" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="current-password" type="password" className="pl-10" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="new-password" type="password" className="pl-10" />
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="confirm-password" type="password" className="pl-10" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-[#4F46E5]" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">Low Stock Alerts</p>
                <p className="text-sm text-gray-600">Get notified when products fall below minimum stock</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">Receipt Notifications</p>
                <p className="text-sm text-gray-600">Alerts for incoming goods and pending receipts</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">Delivery Updates</p>
                <p className="text-sm text-gray-600">Status updates on outgoing deliveries</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">Transfer Confirmations</p>
                <p className="text-sm text-gray-600">Notifications for internal warehouse transfers</p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSavePreferences} className="bg-[#4F46E5] hover:bg-[#4338CA]">
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-gray-600">Role</p>
              <p className="font-semibold">Inventory Manager</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600">User ID</p>
              <p className="font-semibold font-mono">USR-1001</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600">Last Login</p>
              <p className="font-semibold">March 14, 2026 at 9:30 AM</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600">Account Created</p>
              <p className="font-semibold">January 15, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
