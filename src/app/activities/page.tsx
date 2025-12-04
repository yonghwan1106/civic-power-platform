'use client'

import { useState, useEffect } from 'react'
import { ActivityCard } from '@/components/activities/activity-card'
import { ActivityFilters } from '@/components/activities/activity-filters'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import type { Category, District, Difficulty, Activity as ActivityType } from '@/types'

type Activity = ActivityType & {
  organization?: {
    id: string
    name: string
    logo?: string
    verified: boolean
  } | null
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>()
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [viewMode, setViewMode] = useState<'pagination' | 'infinite'>('pagination')
  const [hasMore, setHasMore] = useState(true)

  // 검색 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1) // 검색 시 첫 페이지로 이동
      fetchActivities()
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  // 필터 변경 시 즉시 적용
  useEffect(() => {
    setPage(1)
    fetchActivities()
  }, [categories, districts, difficulty])

  // 페이지 변경 시
  useEffect(() => {
    fetchActivities()
  }, [page])

  // 무한 스크롤 옵저버
  useEffect(() => {
    if (viewMode !== 'infinite') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 0.5 }
    )

    const sentinel = document.querySelector('#infinite-scroll-sentinel')
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel)
      }
    }
  }, [viewMode, hasMore, loading])

  const fetchActivities = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: '12',
        status: 'open',
      })

      if (search) params.append('search', search)
      if (categories.length > 0) params.append('categories', categories.join(','))
      if (districts.length > 0) params.append('districts', districts.join(','))
      if (difficulty) params.append('difficulty', difficulty)

      const response = await fetch(`/api/activities?${params}`)
      const result = await response.json()

      if (result.success) {
        if (viewMode === 'infinite' && page > 1) {
          // 무한 스크롤: 기존 데이터에 추가
          setActivities((prev) => [...prev, ...result.data.items])
        } else {
          // 페이지네이션: 새로 교체
          setActivities(result.data.items)
        }
        setTotal(result.data.total)
        setTotalPages(result.data.totalPages)
        setHasMore(page < result.data.totalPages)
      } else {
        toast.error('활동 목록을 불러오는데 실패했습니다.')
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error)
      toast.error('네트워크 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSearch('')
    setCategories([])
    setDistricts([])
    setDifficulty(undefined)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">봉사활동 둘러보기</h1>
          <p className="text-muted-foreground">
            전국에서 진행되는 다양한 봉사활동을 찾아보세요
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ActivityFilters
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            onCategoriesChange={setCategories}
            districts={districts}
            onDistrictsChange={setDistricts}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            onReset={handleReset}
          />
        </div>

        {/* Results Count & View Mode Toggle */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            총 <span className="font-semibold text-foreground">{total}</span>개의 활동
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'pagination' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setViewMode('pagination')
                setPage(1)
                setActivities([])
              }}
            >
              페이지네이션
            </Button>
            <Button
              variant={viewMode === 'infinite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setViewMode('infinite')
                setPage(1)
                setActivities([])
              }}
            >
              무한 스크롤
            </Button>
          </div>
        </div>

        {/* Activities Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : activities.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>

            {/* Pagination / Infinite Scroll Sentinel */}
            {viewMode === 'pagination' && totalPages > 1 ? (
              <div className="flex justify-center gap-2">
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
                    // Show first page, last page, current page, and pages around current
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
            ) : viewMode === 'infinite' && hasMore ? (
              <div id="infinite-scroll-sentinel" className="flex justify-center py-8">
                {loading ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span>더 불러오는 중...</span>
                  </div>
                ) : (
                  <div className="text-muted-foreground">스크롤하여 더 보기</div>
                )}
              </div>
            ) : viewMode === 'infinite' && !hasMore ? (
              <div className="text-center py-8 text-muted-foreground">
                모든 활동을 불러왔습니다
              </div>
            ) : null}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              검색 결과가 없습니다
            </p>
            <Button onClick={handleReset}>필터 초기화</Button>
          </div>
        )}
      </div>
    </div>
  )
}
