import { NextRequest, NextResponse } from 'next/server'
import { getMockData } from '@/lib/mock-data'
import type { Activity, ActivityFilters } from '@/types'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mockData = getMockData()

  // Parse filters from query params
  const filters: ActivityFilters = {
    categories: searchParams.get('categories')?.split(',') as any,
    districts: searchParams.get('districts')?.split(',') as any,
    difficulty: searchParams.get('difficulty')?.split(',') as any,
    dateFrom: searchParams.get('dateFrom') || undefined,
    dateTo: searchParams.get('dateTo') || undefined,
    status: searchParams.get('status')?.split(',') as any,
    search: searchParams.get('search') || undefined,
  }

  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '12')
  const sort = searchParams.get('sort') || 'date'

  // Filter activities
  let filtered = [...mockData.activities]

  if (filters.categories?.length) {
    filtered = filtered.filter(a => filters.categories!.includes(a.category))
  }

  if (filters.districts?.length) {
    filtered = filtered.filter(a => filters.districts!.includes(a.address.district))
  }

  if (filters.difficulty?.length) {
    filtered = filtered.filter(a => filters.difficulty!.includes(a.difficulty))
  }

  if (filters.dateFrom) {
    filtered = filtered.filter(a => a.date >= filters.dateFrom!)
  }

  if (filters.dateTo) {
    filtered = filtered.filter(a => a.date <= filters.dateTo!)
  }

  if (filters.status?.length) {
    filtered = filtered.filter(a => filters.status!.includes(a.status))
  }

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(search) ||
      a.description.toLowerCase().includes(search) ||
      a.tags.some(tag => tag.toLowerCase().includes(search))
    )
  }

  // Sort activities
  if (sort === 'date') {
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } else if (sort === 'popularity') {
    filtered.sort((a, b) => b.views - a.views)
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.avgRating - a.avgRating)
  }

  // Paginate
  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = filtered.slice(start, end)

  // Add organization info to each activity
  const enrichedActivities = items.map(activity => {
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
    data: {
      items: enrichedActivities,
      total,
      page,
      pageSize,
      totalPages,
    },
  })
}
