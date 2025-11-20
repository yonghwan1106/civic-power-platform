import { NextRequest, NextResponse } from 'next/server'
import { getMockData } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const mockData = getMockData()

  const activity = mockData.activities.find(a => a.id === id)

  if (!activity) {
    return NextResponse.json(
      { success: false, error: 'Activity not found' },
      { status: 404 }
    )
  }

  // Get organization info
  const org = mockData.organizations.find(o => o.id === activity.organizationId)

  // Get reviews for this activity
  const reviews = mockData.reviews
    .filter(r => r.activityId === id)
    .map(review => {
      const user = mockData.users.find(u => u.id === review.userId)
      return {
        ...review,
        user: user ? {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          level: user.level,
        } : null,
      }
    })

  const enrichedActivity = {
    ...activity,
    organization: org ? {
      id: org.id,
      name: org.name,
      logo: org.logo,
      verified: org.verified,
      avgRating: org.avgRating,
      totalActivities: org.totalActivities,
    } : null,
    reviews,
  }

  return NextResponse.json({
    success: true,
    data: enrichedActivity,
  })
}
