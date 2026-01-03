'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { updateProfile, changePassword } from '@/actions/profile-actions'
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Trash2,
  Save,
  Camera
} from 'lucide-react'

interface SettingsContentProps {
  user: {
    id: string
    name: string | null
    email: string
    phone: string | null
    address: string | null
    city: string | null
    state: string | null
    postcode: string | null
    role: string
    createdAt: Date
  } | null
  stats: {
    favorites: number
    reservations: number
  } | null
}

export default function SettingsContent({ user, stats }: SettingsContentProps) {
  const [saving, setSaving] = useState(false)

  // Use real user data from database
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    postcode: user?.postcode || '',
  })

  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    emailReservations: true,
    emailPriceAlerts: false,
    smsUpdates: true,
  })

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const handleProfileSave = async () => {
    setSaving(true)
    try {
      const result = await updateProfile(profile)

      if (result.success) {
        toast.success(result.message || 'Profile updated successfully')
      } else {
        toast.error(result.error || 'Failed to update profile')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error('Please fill in all password fields')
      return
    }

    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match')
      return
    }

    if (passwords.new.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setSaving(true)
    try {
      const result = await changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new,
      })

      if (result.success) {
        toast.success(result.message || 'Password updated successfully')
        setPasswords({ current: '', new: '', confirm: '' })
      } else {
        toast.error(result.error || 'Failed to change password')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handleNotificationsSave = async () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      toast.success('Notification preferences updated')
      setSaving(false)
    }, 1000)
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion is not available in this demo')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
          <p className="text-gray-600">
            Manage your profile, security, and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="account">
              <Shield className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={profile.city}
                          onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={profile.state}
                          onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                          id="postcode"
                          value={profile.postcode}
                          onChange={(e) => setProfile({ ...profile, postcode: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleProfileSave} disabled={saving}>
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-12 w-12 text-gray-400" />
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                          <Camera className="h-4 w-4" />
                        </button>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{profile.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{profile.email}</p>
                      <Badge>Standard Member</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Profile Completion</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">85% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-3">
                        Add a profile photo to complete your profile
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Ensure your account is using a strong password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">
                      Must be at least 8 characters long
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    />
                  </div>

                  <div className="pt-4">
                    <Button onClick={handlePasswordChange} disabled={saving}>
                      <Lock className="h-4 w-4 mr-2" />
                      {saving ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Status: <Badge variant="outline">Disabled</Badge></p>
                      <p className="text-sm text-gray-600">
                        Enable two-factor authentication for enhanced security
                      </p>
                    </div>
                    <Button variant="outline">
                      Enable 2FA
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>
                    Manage devices where you're currently logged in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <p className="font-medium">Windows PC - Chrome</p>
                        <p className="text-sm text-gray-600">Sydney, NSW • Current session</p>
                        <p className="text-xs text-gray-500">Last active: Just now</p>
                      </div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">iPhone 14 - Safari</p>
                        <p className="text-sm text-gray-600">Sydney, NSW</p>
                        <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Choose what emails you'd like to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Marketing & Promotions</p>
                      <p className="text-sm text-gray-600">
                        Special offers, new arrivals, and promotional emails
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.emailMarketing}
                        onChange={(e) => setNotifications({ ...notifications, emailMarketing: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Reservation Updates</p>
                      <p className="text-sm text-gray-600">
                        Order confirmations, delivery updates, and reservation status changes
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.emailReservations}
                        onChange={(e) => setNotifications({ ...notifications, emailReservations: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Price Alerts</p>
                      <p className="text-sm text-gray-600">
                        Get notified when prices drop on your favorite cars
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.emailPriceAlerts}
                        onChange={(e) => setNotifications({ ...notifications, emailPriceAlerts: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>SMS Notifications</CardTitle>
                  <CardDescription>
                    Receive important updates via text message
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">Delivery Updates</p>
                      <p className="text-sm text-gray-600">
                        Get SMS updates when your car is on its way
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.smsUpdates}
                        onChange={(e) => setNotifications({ ...notifications, smsUpdates: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Button onClick={handleNotificationsSave} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="max-w-2xl space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    View your account details and membership status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Account Type</span>
                    <Badge>{user?.role === 'ADMIN' ? 'Admin' : 'Standard Member'}</Badge>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-AU', {
                        month: 'long',
                        year: 'numeric'
                      }) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Total Reservations</span>
                    <span className="font-medium">{stats?.reservations || 0}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-600">Favorite Cars</span>
                    <span className="font-medium">{stats?.favorites || 0}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Download Your Data</CardTitle>
                  <CardDescription>
                    Request a copy of your personal data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    We'll send you a copy of all your data including profile information, reservations, and activity history.
                  </p>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Data Export
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>
                    Permanent actions that cannot be undone
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Delete Account</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete My Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
