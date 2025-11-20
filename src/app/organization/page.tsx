'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Users, Calendar, Clock, Star, TrendingUp, UserCheck, Activity as ActivityIcon,
  Plus, BarChart3
} from 'lucide-react'

interface OrganizationDashboardData {
  organization: {
    id: string
    name: string
    logo?: string
    verified: boolean
    avgRating: number
    totalActivities: number
    totalParticipants: number
  }
  stats: {
    totalActivities: number
    activeActivities: number
    totalParticipants: number
    totalHours: number
    avgRating: number
    pendingApplications: number
  }
  upcomingActivities: any[]
  completedActivities: any[]
  pendingApplications: any[]
  monthlyTrend: Array<{
    month: string
    activities: number
    participants: number
  }>
  recentReviews: any[]
}

export default function OrganizationDashboardPage() {
  const [data, setData] = useState<OrganizationDashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Get first organization from activities
      const response = await fetch('/api/activities?pageSize=1')
      const result = await response.json()

      if (result.success && result.data.items.length > 0) {
        const orgId = result.data.items[0].organization?.id

        if (orgId) {
          const orgResponse = await fetch(`/api/organizations/${orgId}`)
          const orgResult = await orgResponse.json()

          if (orgResult.success) {
            setData(orgResult.data)
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
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

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">데이터를 불러올 수 없습니다</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {data.organization.logo && (
                <img
                  src={data.organization.logo}
                  alt={data.organization.name}
                  className="w-16 h-16 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.organization.name)}&background=0ea5e9&color=fff`
                  }}
                />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{data.organization.name}</h1>
                  {data.organization.verified && (
                    <span className="text-blue-500 text-2xl">✓</span>
                  )}
                </div>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {data.organization.avgRating.toFixed(1)} ·
                  활동 {data.organization.totalActivities}개 ·
                  참여자 {data.organization.totalParticipants}명
                </p>
              </div>
            </div>

            <Link href="/organization/activities/new">
              <Button size="lg">
                <Plus className="w-4 h-4 mr-2" />
                새 활동 만들기
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                전체 활동
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <ActivityIcon className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold">{data.stats.totalActivities}</span>
                <span className="text-muted-foreground">개</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                진행중 {data.stats.activeActivities}개
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                총 참여자
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold">{data.stats.totalParticipants}</span>
                <span className="text-muted-foreground">명</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                누적 {data.stats.totalHours}시간
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                평균 평점
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-3xl font-bold">{data.stats.avgRating.toFixed(1)}</span>
                <span className="text-muted-foreground">/ 5.0</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                대기중 신청
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-orange-500" />
                <span className="text-3xl font-bold">{data.stats.pendingApplications}</span>
                <span className="text-muted-foreground">건</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Monthly Trend */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    월별 활동 추이
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.monthlyTrend.map((month) => (
                    <div key={month.month} className="flex items-center gap-4">
                      <div className="w-16 text-sm font-medium">{month.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-primary h-full"
                              style={{ width: `${(month.participants / 100) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-16 text-right">
                            {month.participants}명
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          활동 {month.activities}개
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Activities */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">예정된 활동</h2>
                <Link href="/organization/activities">
                  <Button variant="outline" size="sm">
                    전체 보기
                  </Button>
                </Link>
              </div>

              {data.upcomingActivities.length > 0 ? (
                <div className="space-y-4">
                  {data.upcomingActivities.map((activity) => (
                    <Card key={activity.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{activity.title}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(activity.date).toLocaleDateString('ko-KR')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {activity.startTime}
                              </span>
                            </div>
                          </div>
                          <Badge variant={activity.status === 'open' ? 'default' : 'secondary'}>
                            {activity.status === 'open' ? '모집중' : activity.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            <Users className="w-4 h-4 inline mr-1" />
                            {activity.currentParticipants} / {activity.maxParticipants}명
                          </span>
                          <Link href={`/activities/${activity.id}`}>
                            <Button variant="ghost" size="sm">
                              상세보기
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      예정된 활동이 없습니다
                    </p>
                    <Link href="/organization/activities/new">
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        새 활동 만들기
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Applications */}
            <Card>
              <CardHeader>
                <CardTitle>대기중인 신청</CardTitle>
                <CardDescription>
                  {data.pendingApplications.length}건의 신청이 대기중입니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                {data.pendingApplications.length > 0 ? (
                  <div className="space-y-4">
                    {data.pendingApplications.slice(0, 5).map((application) => (
                      <div key={application.id} className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {application.user?.avatar && (
                            <img
                              src={application.user.avatar}
                              alt={application.user.name}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium">
                              {application.user?.name || '알 수 없음'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {application.activity?.title}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            ✓
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            ✕
                          </Button>
                        </div>
                      </div>
                    ))}
                    {data.pendingApplications.length > 5 && (
                      <Button variant="outline" size="sm" className="w-full">
                        더 보기 ({data.pendingApplications.length - 5}건)
                      </Button>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    대기중인 신청이 없습니다
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>최근 후기</CardTitle>
              </CardHeader>
              <CardContent>
                {data.recentReviews.length > 0 ? (
                  <div className="space-y-4">
                    {data.recentReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium">
                            {review.user?.name || '알 수 없음'}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {review.comment}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {review.activity?.title}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    아직 후기가 없습니다
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
