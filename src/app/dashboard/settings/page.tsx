import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getUserProfile, getUserStats } from '@/actions/profile-actions'
import SettingsContent from './settings-content'

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/dashboard/settings')
  }

  // Fetch full user profile from database
  const profileResult = await getUserProfile()
  const statsResult = await getUserStats()

  const userProfile = profileResult.success ? profileResult.user : null
  const userStats = statsResult.success ? statsResult.stats : null

  return <SettingsContent user={userProfile} stats={userStats} />
}
