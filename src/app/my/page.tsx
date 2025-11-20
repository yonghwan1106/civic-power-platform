'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ActivityCard } from '@/components/activities/activity-card'
import {
  Trophy, Clock, Calendar, Star, TrendingUp, Award
} from 'lucide-react'

interface UserDashboardData {
  user: {
    id: string
    name: string
    email: string
    avatar?: string
    level: number
    totalHours: number
    totalActivities: number
    badges: string[]
    streak: number
  }
  stats: {
    totalActivities: number
    totalHours: number
    upcomingActivities: number
    reviewsWritten: number
  }
  upcomingActivities: any[]
  pastActivities: any[]
  badges: Array<{
    id: string
    name: string
    icon: string
    description: string
  }>
}

export default function MyDashboardPage() {
  const [data, setData] = useState<UserDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<any[]>([])

  // Mock user ID - in real app, this would come from auth
  const mockUserId = 'user-' + Math.random().toString(36).substring(7)

  useEffect(() => {
    fetchDashboardData()
    fetchRecommendations()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Get first user from mock data
      const response = await fetch('/api/activities?pageSize=1')
      const result = await response.json()

      if (result.success && result.data.items.length > 0) {
        // Use the organization ID from first activity to get a consistent user
        const mockData = await fetch('/api/users/mock').catch(() => null)

        // For demo purposes, create mock dashboard data
        setData({
          user: {
            id: mockUserId,
            name: '김민준',
            email: 'minjun@example.com',
            avatar: undefined,
            level: 5,
            totalHours: 24.5,
            totalActivities: 8,
            badges: ['seedling', 'sprout', 'action-hero'],
            streak: 3,
          },
          stats: {
            totalActivities: 8,
            totalHours: 24.5,
            upcomingActivities: 2,
            reviewsWritten: 5,
          },
          upcomingActivities: [],
          pastActivities: [],
          badges: [
            { id: 'seedling', name: '새싹', icon: '🌱', description: '첫 활동 완료' },
            { id: 'sprout', name: '새순', icon: '🌿', description: '5개 활동 완료' },
            { id: 'action-hero', name: '액션 히어로', icon: '🏃', description: '3회 연속 참여' },
          ],
        })
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRecommendations = async () => {
    try {
      // For demo, just get some activities
      const response = await fetch('/api/activities?status=open&pageSize=4')
      const result = await response.json()

      if (result.success) {
        setRecommendations(result.data.items)
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error)
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
          <div className="flex items-center gap-4 mb-4">
            {data.user.avatar ? (
              <img
                src={data.user.avatar}
                alt={data.user.name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                {data.user.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{data.user.name}님의 대시보드</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Level {data.user.level}
                {data.user.streak > 0 && (
                  <span className="ml-2">🔥 {data.user.streak}일 연속</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                참여 활동
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold">{data.stats.totalActivities}</span>
                <span className="text-muted-foreground">개</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                봉사 시간
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold">{data.stats.totalHours}</span>
                <span className="text-muted-foreground">시간</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                예정 활동
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold">{data.stats.upcomingActivities}</span>
                <span className="text-muted-foreground">개</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                작성 후기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold">{data.stats.reviewsWritten}</span>
                <span className="text-muted-foreground">개</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  AI 추천 활동
                </h2>
                <Link href="/activities">
                  <Button variant="outline" size="sm">
                    모두 보기
                  </Button>
                </Link>
              </div>

              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      matchingScore={Math.floor(Math.random() * 30) + 70}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      추천 활동이 없습니다
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Upcoming Activities */}
            <div>
              <h2 className="text-2xl font-bold mb-4">예정된 활동</h2>
              {data.upcomingActivities.length > 0 ? (
                <div className="space-y-4">
                  {data.upcomingActivities.map((activity) => (
                    <Card key={activity.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">
                              {activity.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {activity.organization?.name}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>📅 {new Date(activity.date).toLocaleDateString('ko-KR')}</span>
                              <span>🕐 {activity.startTime}</span>
                            </div>
                          </div>
                          <Badge variant={
                            activity.participation?.status === 'approved' ? 'default' : 'secondary'
                          }>
                            {activity.participation?.status === 'approved' ? '승인됨' : '신청중'}
                          </Badge>
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
                    <Link href="/activities">
                      <Button>활동 찾아보기</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>획득한 뱃지</CardTitle>
                <CardDescription>
                  {data.badges.length}개의 뱃지를 획득했습니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {data.badges.map((badge) => (
                    <div key={badge.id} className="text-center">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <p className="text-xs font-medium">{badge.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>이번 달 활동</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">참여 활동</span>
                  <span className="font-semibold">2개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">봉사 시간</span>
                  <span className="font-semibold">6시간</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">작성 후기</span>
                  <span className="font-semibold">1개</span>
                </div>
              </CardContent>
            </Card>

            {/* Activity History Link */}
            <Card>
              <CardContent className="pt-6">
                <Link href="/my/history">
                  <Button variant="outline" className="w-full">
                    활동 내역 전체보기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
