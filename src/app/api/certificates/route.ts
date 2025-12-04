import { NextRequest, NextResponse } from 'next/server'
import { getMockData } from '@/lib/mock-data'
import type { CertificateStatus } from '@/types'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mockData = getMockData()

  // Parse filters from query params
  const userId = searchParams.get('userId') || undefined
  const status = searchParams.get('status') as CertificateStatus | null
  const search = searchParams.get('search') || undefined
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')
  const sort = searchParams.get('sort') || 'latest'

  // Filter certificates
  let filtered = [...mockData.certificates]

  if (userId) {
    filtered = filtered.filter(c => c.userId === userId)
  }

  if (status) {
    filtered = filtered.filter(c => c.status === status)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filtered = filtered.filter(c =>
      c.activityTitle.toLowerCase().includes(searchLower) ||
      c.organizationName.toLowerCase().includes(searchLower) ||
      c.certificateNumber.toLowerCase().includes(searchLower)
    )
  }

  // Sort certificates
  if (sort === 'latest') {
    filtered.sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime())
  } else if (sort === 'oldest') {
    filtered.sort((a, b) => new Date(a.issuedAt).getTime() - new Date(b.issuedAt).getTime())
  } else if (sort === 'hours') {
    filtered.sort((a, b) => b.hours - a.hours)
  }

  // Paginate
  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = filtered.slice(start, end)

  // Calculate stats
  const totalHours = filtered.reduce((sum, c) => sum + c.hours, 0)
  const totalCertificates = filtered.length

  return NextResponse.json({
    success: true,
    data: {
      items,
      total,
      page,
      pageSize,
      totalPages,
      stats: {
        totalCertificates,
        totalHours,
      },
    },
  })
}
