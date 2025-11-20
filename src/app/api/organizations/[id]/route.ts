import { NextRequest, NextResponse } from 'next/server'
import { getMockData } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const mockData = getMockData()

  const organization = mockData.organizations.find(o => o.id === id)

  if (!organization) {
    return NextResponse.json(
      { success: false, error: 'Organization not found' },
      { status: 404 }
    )
  }

  // Get organization's activities
  const activities = mockData.activities.filter(a => a.organizationId === id)

  // Separate by status
  const upcomingActivities = activities.filter(a =>
    a.status === 'open' && new Date(a.date) > new Date()
  )
  const activeActivities = activities.filter(a => a.status === 'open')
  const completedActivities = activities.filter(a => a.status === 'completed')

  // Get participations for these activities
  const activityIds = activities.map(a => a.id)
  const participations = mockData.participations.filter(p =>
    activityIds.includes(p.activityId)
  )

  // Get pending applications
  const pendingApplications = participations.filter(p =>
    p.status === 'applied'
  )

  // Calculate stats
  const totalParticipants = participations.filter(p =>
    p.status === 'attended'
  ).length

  const totalHours = totalParticipants * 3 // Rough estimate

  // Get reviews for organization
  const reviews = mockData.reviews.filter(r => r.organizationId === id)

  // Monthly trend (mock data)
  const monthlyTrend = [
    { month: '7월', activities: 3, participants: 45 },
    { month: '8월', activities: 5, participants: 72 },
    { month: '9월', activities: 4, participants: 58 },
    { month: '10월', activities: 6, participants: 89 },
    { month: '11월', activities: 4, participants: 65 },
  ]

  return NextResponse.json({
    success: true,
    data: {
      organization,
      stats: {
        totalActivities: activities.length,
        activeActivities: activeActivities.length,
        totalParticipants,
        totalHours,
        avgRating: organization.avgRating,
        pendingApplications: pendingApplications.length,
      },
      upcomingActivities,
      completedActivities: completedActivities.slice(0, 5),
      pendingApplications: pendingApplications.slice(0, 10).map(p => {
        const activity = activities.find(a => a.id === p.activityId)
        const user = mockData.users.find(u => u.id === p.userId)
        return {
          ...p,
          activity: activity ? {
            id: activity.id,
            title: activity.title,
            date: activity.date,
          } : null,
          user: user ? {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            level: user.level,
          } : null,
        }
      }),
      monthlyTrend,
      recentReviews: reviews.slice(0, 5).map(r => {
        const user = mockData.users.find(u => u.id === r.userId)
        const activity = mockData.activities.find(a => a.id === r.activityId)
        return {
          ...r,
          user: user ? {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
          } : null,
          activity: activity ? {
            id: activity.id,
            title: activity.title,
          } : null,
        }
      }),
    },
  })
}
