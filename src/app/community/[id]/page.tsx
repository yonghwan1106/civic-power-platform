'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  Send,
  BookOpen,
  Sparkles,
  Camera,
  Megaphone,
  MoreHorizontal,
} from 'lucide-react'
import toast from 'react-hot-toast'
import type { Post, PostType, Comment } from '@/types'

const postTypeLabels: Record<PostType, { label: string; icon: React.ReactNode; color: string }> = {
  review: { label: '후기', icon: <BookOpen className="w-3 h-3" />, color: 'bg-blue-100 text-blue-800' },
  story: { label: '이야기', icon: <Sparkles className="w-3 h-3" />, color: 'bg-purple-100 text-purple-800' },
  photo: { label: '사진', icon: <Camera className="w-3 h-3" />, color: 'bg-green-100 text-green-800' },
  announcement: { label: '공지', icon: <Megaphone className="w-3 h-3" />, color: 'bg-orange-100 text-orange-800' },
}

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/${id}`)
      const result = await response.json()

      if (result.success) {
        setPost(result.data)
      } else {
        toast.error('게시물을 찾을 수 없습니다.')
        router.push('/community')
      }
    } catch (error) {
      console.error('Failed to fetch post:', error)
      toast.error('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleReaction = async (reaction: 'like' | 'love' | 'applause') => {
    if (!post) return

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction }),
      })
      const result = await response.json()

      if (result.success) {
        setPost({
          ...post,
          reactions: result.data.reactions,
          userReaction: result.data.userReaction,
        })
      }
    } catch (error) {
      toast.error('반응 업데이트에 실패했습니다.')
    }
  }

  const handleSubmitComment = async () => {
    if (!commentText.trim() || !post) return

    setSubmitting(true)
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText.trim() }),
      })
      const result = await response.json()

      if (result.success) {
        setPost({
          ...post,
          comments: [...post.comments, result.data],
        })
        setCommentText('')
        toast.success('댓글이 작성되었습니다.')
      } else {
        toast.error(result.error || '댓글 작성에 실패했습니다.')
      }
    } catch (error) {
      toast.error('네트워크 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return '방금 전'
    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    if (days < 7) return `${days}일 전`
    return date.toLocaleDateString('ko-KR')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">게시물</h1>
        </div>

        {/* Post */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-primary font-semibold text-lg">
                      {post.author.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Level {post.author.level} · {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${postTypeLabels[post.type].color}`}>
                  <span className="mr-1">{postTypeLabels[post.type].icon}</span>
                  {postTypeLabels[post.type].label}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Content */}
            <p className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>

            {/* Images */}
            {post.images.length > 0 && (
              <div className={`grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {post.images.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                  >
                    <img
                      src={image}
                      alt={`Post image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Activity Reference */}
            {post.activity && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">연결된 활동</p>
                <p className="font-medium">{post.activity.name}</p>
                <p className="text-sm text-muted-foreground">{post.activity.organization}</p>
              </div>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Reactions */}
            <div className="flex items-center gap-6 pt-4 border-t">
              <button
                className={`flex items-center gap-2 transition-colors ${
                  post.userReaction === 'like'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={() => handleReaction('like')}
              >
                <ThumbsUp className="w-5 h-5" />
                <span className="font-medium">{post.reactions.like}</span>
              </button>
              <button
                className={`flex items-center gap-2 transition-colors ${
                  post.userReaction === 'love'
                    ? 'text-red-500'
                    : 'text-muted-foreground hover:text-red-500'
                }`}
                onClick={() => handleReaction('love')}
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">{post.reactions.love}</span>
              </button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{post.comments.length}</span>
              </div>
              <button
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ml-auto"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast.success('링크가 복사되었습니다.')
                }}
              >
                <Share2 className="w-5 h-5" />
                <span>공유</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold">댓글 {post.comments.length}개</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Comment Input */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold text-sm">나</span>
              </div>
              <div className="flex-1 flex gap-2">
                <Input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="댓글을 작성하세요..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmitComment()
                    }
                  }}
                  disabled={submitting}
                />
                <Button
                  onClick={handleSubmitComment}
                  disabled={submitting || !commentText.trim()}
                  size="icon"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Comments List */}
            {post.comments.length > 0 ? (
              <div className="space-y-4 pt-4 border-t">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      {comment.author.avatar ? (
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-muted-foreground font-semibold text-sm">
                          {comment.author.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">
                            Level {comment.author.level}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{formatRelativeDate(comment.createdAt)}</span>
                        <button className="hover:text-primary transition-colors">
                          좋아요 {comment.likes > 0 && comment.likes}
                        </button>
                        <button className="hover:text-primary transition-colors">답글</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>첫 번째 댓글을 작성해보세요!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
