'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Search,
  Sparkles,
  BookOpen,
  Camera,
  Megaphone,
  ThumbsUp,
  X,
} from 'lucide-react'
import toast from 'react-hot-toast'
import type { Post, PostType } from '@/types'

const postTypeLabels: Record<PostType, { label: string; icon: React.ReactNode; color: string }> = {
  review: { label: '후기', icon: <BookOpen className="w-3 h-3" />, color: 'bg-blue-100 text-blue-800' },
  story: { label: '이야기', icon: <Sparkles className="w-3 h-3" />, color: 'bg-purple-100 text-purple-800' },
  photo: { label: '사진', icon: <Camera className="w-3 h-3" />, color: 'bg-green-100 text-green-800' },
  announcement: { label: '공지', icon: <Megaphone className="w-3 h-3" />, color: 'bg-orange-100 text-orange-800' },
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState<PostType | null>(null)
  const [sort, setSort] = useState<'latest' | 'popular' | 'comments'>('latest')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      fetchPosts()
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    setPage(1)
    fetchPosts()
  }, [selectedType, sort])

  useEffect(() => {
    fetchPosts()
  }, [page])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: '10',
        sort,
      })

      if (search) params.append('search', search)
      if (selectedType) params.append('type', selectedType)

      const response = await fetch(`/api/posts?${params}`)
      const result = await response.json()

      if (result.success) {
        setPosts(result.data.items)
        setTotal(result.data.total)
        setTotalPages(result.data.totalPages)
      } else {
        toast.error('게시물을 불러오는데 실패했습니다.')
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      toast.error('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleReaction = async (postId: string, reaction: 'like' | 'love' | 'applause') => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction }),
      })
      const result = await response.json()

      if (result.success) {
        setPosts(posts.map(post =>
          post.id === postId
            ? { ...post, reactions: result.data.reactions, userReaction: result.data.userReaction }
            : post
        ))
      }
    } catch (error) {
      toast.error('반응 업데이트에 실패했습니다.')
    }
  }

  const formatDate = (dateString: string) => {
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">커뮤니티</h1>
            <p className="text-muted-foreground">
              시민들의 활동 경험과 이야기를 공유하세요
            </p>
          </div>
          <Link href="/community/write">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              글 작성
            </Button>
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedType === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              전체
            </Button>
            {(Object.keys(postTypeLabels) as PostType[]).map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="gap-1"
              >
                {postTypeLabels[type].icon}
                {postTypeLabels[type].label}
              </Button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">정렬:</span>
            <Button
              variant={sort === 'latest' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSort('latest')}
            >
              최신순
            </Button>
            <Button
              variant={sort === 'popular' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSort('popular')}
            >
              인기순
            </Button>
            <Button
              variant={sort === 'comments' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSort('comments')}
            >
              댓글순
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          총 <span className="font-semibold text-foreground">{total}</span>개의 게시물
        </p>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id} className="transition-all hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {post.author.avatar ? (
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-primary font-semibold">
                              {post.author.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{post.author.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Level {post.author.level} · {formatDate(post.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Badge className={`text-xs ${postTypeLabels[post.type].color}`}>
                        <span className="mr-1">{postTypeLabels[post.type].icon}</span>
                        {postTypeLabels[post.type].label}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Content */}
                    <Link href={`/community/${post.id}`}>
                      <p className="text-sm leading-relaxed cursor-pointer hover:text-primary transition-colors">
                        {post.content.length > 200
                          ? `${post.content.slice(0, 200)}...`
                          : post.content}
                      </p>
                    </Link>

                    {/* Images */}
                    {post.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {post.images.slice(0, 3).map((image, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                          >
                            <img
                              src={image}
                              alt={`Post image ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {idx === 2 && post.images.length > 3 && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                                +{post.images.length - 3}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Activity Reference */}
                    {post.activity && (
                      <div className="bg-muted/50 p-3 rounded-lg text-sm">
                        <span className="text-muted-foreground">활동: </span>
                        <span className="font-medium">{post.activity.name}</span>
                        <span className="text-muted-foreground"> · {post.activity.organization}</span>
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Reactions */}
                    <div className="flex items-center gap-4 pt-3 border-t">
                      <button
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          post.userReaction === 'like'
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-primary'
                        }`}
                        onClick={() => handleReaction(post.id, 'like')}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.reactions.like}</span>
                      </button>
                      <button
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          post.userReaction === 'love'
                            ? 'text-red-500'
                            : 'text-muted-foreground hover:text-red-500'
                        }`}
                        onClick={() => handleReaction(post.id, 'love')}
                      >
                        <Heart className="w-4 h-4" />
                        <span>{post.reactions.love}</span>
                      </button>
                      <Link
                        href={`/community/${post.id}`}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments.length}</span>
                      </Link>
                      <button
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.origin + `/community/${post.id}`)
                          toast.success('링크가 복사되었습니다.')
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  게시물이 없습니다
                </p>
                <Link href="/community/write">
                  <Button>첫 번째 글 작성하기</Button>
                </Link>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  이전
                </Button>
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= page - 1 && pageNum <= page + 1)
                    ) {
                      return (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? 'default' : 'outline'}
                          onClick={() => setPage(pageNum)}
                          className="w-10"
                        >
                          {pageNum}
                        </Button>
                      )
                    } else if (pageNum === page - 2 || pageNum === page + 2) {
                      return <span key={pageNum}>...</span>
                    }
                    return null
                  })}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  다음
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">커뮤니티 현황</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">전체 게시물</span>
                  <span className="font-semibold">{total}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">오늘 새 글</span>
                  <span className="font-semibold">
                    {posts.filter(p => {
                      const today = new Date().toDateString()
                      return new Date(p.createdAt).toDateString() === today
                    }).length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">인기 태그</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['봉사', '환경', '교육', '나눔', '청년', '어린이', '지역사회'].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setSearch(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">커뮤니티 가이드</h3>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• 서로를 존중하며 대화해주세요</p>
                <p>• 활동 경험을 진솔하게 공유해주세요</p>
                <p>• 개인정보 보호에 유의해주세요</p>
                <p>• 광고성 게시물은 삭제될 수 있습니다</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
