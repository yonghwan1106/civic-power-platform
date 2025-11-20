import { NextRequest, NextResponse } from 'next/server'
import { getMockData } from '@/lib/mock-data'
import { getRecommendations } from '@/lib/matching-algorithm'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('userId')
  const limit = parseInt(searchParams.get('limit') || '8')

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'userId is required' },
      { status: 400 }
    )
  }

  const mockData = getMockData()

  // Find user
  const user = mockData.users.find(u => u.id === userId)

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 404 }
    )
  }

  // Get recommendations
  const recommendations = getRecommendations(user, mockData.activities, limit)

  // Enrich with organization info
  const enrichedRecommendations = recommendations.map(activity => {
    const org = mockData.organizations.find(o => o.id === activity.organizationId)
    return {
      ...activity,
      organization: org ? {
        id: org.id,
        name: org.name,
        logo: org.logo,
        verified: org.verified,
      } : null,
    }
  })

  return NextResponse.json({
    success: true,
    data: enrichedRecommendations,
  })
}
