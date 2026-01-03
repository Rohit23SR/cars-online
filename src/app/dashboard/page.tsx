import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Car,
  Heart,
  ShoppingCart,
  Calendar,
  TrendingUp,
  Settings,
  FileText
} from 'lucide-react'
import { getUserStats, getRecentActivity } from '@/actions/profile-actions'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/dashboard')
  }

  // Fetch real user stats and activity from database
  const statsResult = await getUserStats()
  const activityResult = await getRecentActivity()

  const stats = statsResult.success && statsResult.stats ? statsResult.stats : {
    favorites: 0,
    activeReservations: 0,
    viewedCars: 0,
  }

  const recentActivity = activityResult.success ? activityResult.activities : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {session.user.name || 'User'}!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Favorite Cars
              </CardTitle>
              <Heart className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.favorites}</div>
              <Link href="/dashboard/favorites" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                View all →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Reservations
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeReservations}</div>
              <Link href="/dashboard/reservations" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                View details →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Cars Viewed
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.viewedCars}</div>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions with Cars Online</CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <Car className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No recent activity yet</p>
                    <Link href="/cars" className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                      Browse cars to get started
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.type === 'favorite' ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          {activity.type === 'favorite' && <Heart className="h-5 w-5 text-red-600" />}
                          {activity.type === 'reservation' && <ShoppingCart className="h-5 w-5 text-green-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.car}</p>
                          <p className="text-sm text-gray-500">
                            {activity.type === 'favorite' && 'Added to favorites'}
                            {activity.type === 'reservation' && 'Created reservation'}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">{activity.date}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/cars">
                    <Car className="mr-2 h-4 w-4" />
                    Browse Cars
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/favorites">
                    <Heart className="mr-2 h-4 w-4" />
                    My Favorites
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/reservations">
                    <FileText className="mr-2 h-4 w-4" />
                    My Reservations
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">7-Day Guarantee</h3>
                    <p className="text-sm text-gray-700">
                      Don't forget! You have 7 days to return your car if you're not satisfied.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
