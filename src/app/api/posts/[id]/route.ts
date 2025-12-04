import { NextRequest, NextResponse } from 'next/server'
import { getMockData } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const mockData = getMockData()

  const post = mockData.posts.find(p => p.id === id)

  if (!post) {
    return NextResponse.json(
      { success: false, error: '게시물을 찾을 수 없습니다.' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    data: post,
  })
}

// Add a comment to a post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const mockData = getMockData()

    const post = mockData.posts.find(p => p.id === id)

    if (!post) {
      return NextResponse.json(
        { success: false, error: '게시물을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // Get a random user as author
    const randomUser = mockData.users[Math.floor(Math.random() * mockData.users.length)]

    const newComment = {
      id: `comment-${Date.now()}`,
      author: {
        id: randomUser.id,
        name: randomUser.name,
        avatar: randomUser.avatar,
        level: randomUser.level,
      },
      content: body.content,
      createdAt: new Date().toISOString(),
      likes: 0,
    }

    // Add comment to post
    post.comments.push(newComment)

    return NextResponse.json({
      success: true,
      data: newComment,
      message: '댓글이 작성되었습니다.',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '댓글 작성에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// Update reaction on a post
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const mockData = getMockData()

    const post = mockData.posts.find(p => p.id === id)

    if (!post) {
      return NextResponse.json(
        { success: false, error: '게시물을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const { reaction } = body // 'like' | 'love' | 'applause'

    if (reaction && ['like', 'love', 'applause'].includes(reaction)) {
      // Toggle reaction
      if (post.userReaction === reaction) {
        // Remove reaction
        post.reactions[reaction as keyof typeof post.reactions]--
        post.userReaction = undefined
      } else {
        // Remove previous reaction if exists
        if (post.userReaction) {
          post.reactions[post.userReaction as keyof typeof post.reactions]--
        }
        // Add new reaction
        post.reactions[reaction as keyof typeof post.reactions]++
        post.userReaction = reaction as 'like' | 'love' | 'applause'
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        reactions: post.reactions,
        userReaction: post.userReaction,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '반응 업데이트에 실패했습니다.' },
      { status: 500 }
    )
  }
}
