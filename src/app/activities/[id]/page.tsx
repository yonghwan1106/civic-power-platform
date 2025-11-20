'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import {
  MapPin, Users, Calendar, Clock, AlertCircle, CheckCircle,
  Share2, Bookmark, ArrowLeft, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ActivityDetail {
  id: string
  organizationId: string
  title: string
  description: string
  category: string
  tags: string[]
  date: string
  startTime: string
  endTime: string
  address: {
    full: string
    district: string
    coordinates: { lat: number; lng: number }
  }
  detailAddress?: string
  maxParticipants: number
  currentParticipants: number
  difficulty: string
  requirements: string[]
  preparation: string[]
  notices: string[]
  benefits: string[]
  images: string[]
  thumbnail?: string
  contact: {
    name: string
    phone: string
    email: string
  }
  views: number
  avgRating: number
  reviewCount: number
  status: string
  organization?: {
    id: string
    name: string
    logo?: string
    verified: boolean
    avgRating: number
    totalActivities: number
  } | null
  reviews?: Array<{
    id: string
    userId: string
    rating: number
    comment: string
    createdAt: string
    user: {
      id: string
      name: string
      avatar?: string
      level: number
    } | null
  }>
}

const categoryLabels: Record<string, string> = {
  environment: '환경',
  education: '교육',
  welfare: '복지',
  culture: '문화',
  animal: '동물',
  disaster: '재난/안전',
  other: '기타',
}

const difficultyLabels: Record<string, string> = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
}

export default function ActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [activity, setActivity] = useState<ActivityDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivity()
  }, [id])

  const fetchActivity = async () => {
    try {
      const response = await fetch(`/api/activities/${id}`)
      const result = await response.json()

      if (result.success) {
        setActivity(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch activity:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">활동을 찾을 수 없습니다</h1>
          <Link href="/activities">
            <Button>목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    )
  }

  const spotsLeft = activity.maxParticipants - activity.currentParticipants
  const isFull = spotsLeft <= 0
  const isUpcoming = new Date(activity.date) > new Date()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/activities">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            {activity.thumbnail && (
              <div className="relative h-96 rounded-lg overflow-hidden bg-muted">
                <img
                  src={activity.thumbnail}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/1200x600/0ea5e9/white?text=${encodeURIComponent(activity.title)}`
                  }}
                />
              </div>
            )}

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="secondary">
                  {categoryLabels[activity.category]}
                </Badge>
                <Badge variant="outline">
                  {difficultyLabels[activity.difficulty]}
                </Badge>
                {activity.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold mb-4">{activity.title}</h1>

              {/* Organization */}
              {activity.organization && (
                <div className="flex items-center gap-3 mb-4">
                  {activity.organization.logo && (
                    <img
                      src={activity.organization.logo}
                      alt={activity.organization.name}
                      className="w-12 h-12 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activity.organization!.name)}&background=0ea5e9&color=fff`
                      }}
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{activity.organization.name}</span>
                      {activity.organization.verified && (
                        <span className="text-blue-500">✓</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ⭐ {activity.organization.avgRating.toFixed(1)} ·
                      활동 {activity.organization.totalActivities}개
                    </div>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>조회 {activity.views}</span>
                {activity.reviewCount > 0 && (
                  <span>⭐ {activity.avgRating.toFixed(1)} ({activity.reviewCount})</span>
                )}
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>활동 설명</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {activity.description}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            {activity.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>준비사항</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activity.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {activity.preparation.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>제공사항</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activity.preparation.map((prep, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{prep}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Notices */}
            {activity.notices.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>유의사항</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activity.notices.map((notice, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{notice}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            {activity.reviews && activity.reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>후기 ({activity.reviews.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activity.reviews.map((review) => (
                      <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center gap-3 mb-2">
                          {review.user && (
                            <>
                              <img
                                src={review.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user.name)}`}
                                alt={review.user.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{review.user.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    Lv.{review.user.level}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold">
                      {new Date(activity.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{activity.startTime} - {activity.endTime}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{activity.address.full}</p>
                      {activity.detailAddress && (
                        <p className="text-sm text-muted-foreground">{activity.detailAddress}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>
                      {activity.currentParticipants} / {activity.maxParticipants}명
                      {isFull ? (
                        <span className="ml-2 text-red-500 font-medium">모집완료</span>
                      ) : (
                        <span className="ml-2 text-green-500 font-medium">
                          {spotsLeft}명 남음
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="pt-4 space-y-2">
                    {isUpcoming && !isFull ? (
                      <Button className="w-full" size="lg">
                        신청하기
                      </Button>
                    ) : isFull ? (
                      <Button className="w-full" size="lg" disabled>
                        모집 완료
                      </Button>
                    ) : (
                      <Button className="w-full" size="lg" variant="outline" disabled>
                        종료된 활동
                      </Button>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        공유
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Bookmark className="w-4 h-4 mr-2" />
                        저장
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">문의하기</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">담당자:</span>{' '}
                  <span className="font-medium">{activity.contact.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">전화:</span>{' '}
                  <span>{activity.contact.phone}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">이메일:</span>{' '}
                  <span>{activity.contact.email}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
