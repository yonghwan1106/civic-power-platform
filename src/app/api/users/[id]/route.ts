import { NextRequest, NextResponse } from 'next/server'
import { getMockData } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const mockData = getMockData()

  const user = mockData.users.find(u => u.id === id)

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 404 }
    )
  }

  // Get user's participations
  const participations = mockData.participations.filter(p => p.userId === id)

  // Get activities the user participated in
  const activityIds = participations.map(p => p.activityId)
  const activities = mockData.activities.filter(a => activityIds.includes(a.id))

  // Enrich activities with organization info
  const enrichedActivities = activities.map(activity => {
    const org = mockData.organizations.find(o => o.id === activity.organizationId)
    const participation = participations.find(p => p.activityId === activity.id)

    return {
      ...activity,
      participation,
      organization: org ? {
        id: org.id,
        name: org.name,
        logo: org.logo,
        verified: org.verified,
      } : null,
    }
  })

  // Separate upcoming and past activities
  const now = new Date()
  const upcomingActivities = enrichedActivities.filter(a =>
    new Date(a.date) > now && (a.participation?.status === 'approved' || a.participation?.status === 'applied')
  )
  const pastActivities = enrichedActivities.filter(a =>
    new Date(a.date) <= now || a.participation?.status === 'attended'
  )

  // Get user's reviews
  const reviews = mockData.reviews.filter(r => r.userId === id)

  // Calculate stats
  const attendedCount = participations.filter(p => p.status === 'attended').length
  const totalHours = attendedCount * 3 // Rough estimate

  return NextResponse.json({
    success: true,
    data: {
      user,
      stats: {
        totalActivities: attendedCount,
        totalHours,
        upcomingActivities: upcomingActivities.length,
        reviewsWritten: reviews.length,
      },
      upcomingActivities,
      pastActivities,
      badges: mockData.badges.filter(b => user.badges.includes(b.id)),
    },
  })
}
