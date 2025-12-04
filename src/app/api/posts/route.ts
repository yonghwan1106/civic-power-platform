import { NextRequest, NextResponse } from 'next/server'
import { getMockData } from '@/lib/mock-data'
import type { PostType } from '@/types'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mockData = getMockData()

  // Parse filters from query params
  const type = searchParams.get('type') as PostType | null
  const search = searchParams.get('search') || undefined
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')
  const sort = searchParams.get('sort') || 'latest'

  // Filter posts
  let filtered = [...mockData.posts]

  if (type) {
    filtered = filtered.filter(p => p.type === type)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filtered = filtered.filter(p =>
      p.content.toLowerCase().includes(searchLower) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      p.author.name.toLowerCase().includes(searchLower)
    )
  }

  // Sort posts
  if (sort === 'latest') {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } else if (sort === 'popular') {
    filtered.sort((a, b) => {
      const aTotal = a.reactions.like + a.reactions.love + a.reactions.applause
      const bTotal = b.reactions.like + b.reactions.love + b.reactions.applause
      return bTotal - aTotal
    })
  } else if (sort === 'comments') {
    filtered.sort((a, b) => b.comments.length - a.comments.length)
  }

  // Paginate
  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = filtered.slice(start, end)

  return NextResponse.json({
    success: true,
    data: {
      items,
      total,
      page,
      pageSize,
      totalPages,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const mockData = getMockData()

    // Get a random user as author (in real app, this would be the authenticated user)
    const randomUser = mockData.users[Math.floor(Math.random() * mockData.users.length)]

    const newPost = {
      id: `post-${Date.now()}`,
      type: body.type || 'story',
      author: {
        id: randomUser.id,
        name: randomUser.name,
        avatar: randomUser.avatar,
        level: randomUser.level,
      },
      activity: body.activityId ? {
        id: body.activityId,
        name: mockData.activities.find(a => a.id === body.activityId)?.title || '',
        organization: mockData.organizations.find(o =>
          o.id === mockData.activities.find(a => a.id === body.activityId)?.organizationId
        )?.name || '',
      } : undefined,
      content: body.content,
      images: body.images || [],
      tags: body.tags || [],
      reactions: { like: 0, love: 0, applause: 0 },
      comments: [],
      createdAt: new Date().toISOString(),
    }

    // In a real app, we would save to database
    // For mock, we just return the created post
    mockData.posts.unshift(newPost)

    return NextResponse.json({
      success: true,
      data: newPost,
      message: '게시물이 작성되었습니다.',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '게시물 작성에 실패했습니다.' },
      { status: 500 }
    )
  }
}
