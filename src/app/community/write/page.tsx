'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  Camera,
  Megaphone,
  X,
  Plus,
  Link as LinkIcon,
} from 'lucide-react'
import toast from 'react-hot-toast'
import type { PostType, Activity } from '@/types'

const postTypes: { type: PostType; label: string; icon: React.ReactNode; description: string }[] = [
  {
    type: 'review',
    label: '후기',
    icon: <BookOpen className="w-5 h-5" />,
    description: '봉사활동 후기를 공유해주세요',
  },
  {
    type: 'story',
    label: '이야기',
    icon: <Sparkles className="w-5 h-5" />,
    description: '일상적인 이야기를 나눠주세요',
  },
  {
    type: 'photo',
    label: '사진',
    icon: <Camera className="w-5 h-5" />,
    description: '활동 사진을 공유해주세요',
  },
  {
    type: 'announcement',
    label: '공지',
    icon: <Megaphone className="w-5 h-5" />,
    description: '중요한 공지사항을 올려주세요',
  },
]

export default function WritePostPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<PostType>('story')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [showActivitySelector, setShowActivitySelector] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activitiesLoading, setActivitiesLoading] = useState(false)

  useEffect(() => {
    if (showActivitySelector && activities.length === 0) {
      fetchActivities()
    }
  }, [showActivitySelector])

  const fetchActivities = async () => {
    setActivitiesLoading(true)
    try {
      const response = await fetch('/api/activities?pageSize=50&status=completed')
      const result = await response.json()
      if (result.success) {
        setActivities(result.data.items)
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error)
    } finally {
      setActivitiesLoading(false)
    }
  }

  const handleAddTag = () => {
    const tag = tagInput.trim().replace(/^#/, '')
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('내용을 입력해주세요.')
      return
    }

    if (content.trim().length < 10) {
      toast.error('내용을 10자 이상 입력해주세요.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType,
          content: content.trim(),
          tags,
          activityId: selectedActivity?.id,
          images: [],
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('게시물이 작성되었습니다.')
        router.push('/community')
      } else {
        toast.error(result.error || '게시물 작성에 실패했습니다.')
      }
    } catch (error) {
      console.error('Failed to create post:', error)
      toast.error('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">글 작성</h1>
            <p className="text-sm text-muted-foreground">
              커뮤니티에 새 글을 작성합니다
            </p>
          </div>
        </div>

        {/* Post Type Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">글 종류 선택</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {postTypes.map(({ type, label, icon, description }) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedType === type
                      ? 'border-primary bg-primary/5'
                      : 'border-input hover:border-primary/50'
                  }`}
                >
                  <div className={`mb-2 ${selectedType === type ? 'text-primary' : 'text-muted-foreground'}`}>
                    {icon}
                  </div>
                  <p className="font-medium text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground mt-1 hidden md:block">
                    {description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">내용</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="여러분의 이야기를 공유해주세요..."
              className="w-full min-h-[200px] p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{content.length}자</span>
              <span>최소 10자 이상</span>
            </div>
          </CardContent>
        </Card>

        {/* Activity Link */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              활동 연결 (선택)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedActivity ? (
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{selectedActivity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(selectedActivity.date).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedActivity(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowActivitySelector(!showActivitySelector)}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  활동 연결하기
                </Button>

                {showActivitySelector && (
                  <div className="mt-4 max-h-60 overflow-y-auto border rounded-lg">
                    {activitiesLoading ? (
                      <div className="p-4 space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="h-12 w-full" />
                        ))}
                      </div>
                    ) : activities.length > 0 ? (
                      activities.map((activity) => (
                        <button
                          key={activity.id}
                          onClick={() => {
                            setSelectedActivity(activity)
                            setShowActivitySelector(false)
                          }}
                          className="w-full p-3 text-left hover:bg-muted/50 transition-colors border-b last:border-b-0"
                        >
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.date).toLocaleDateString('ko-KR')}
                          </p>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground text-sm">
                        연결할 활동이 없습니다
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">태그 (최대 5개)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-3">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="태그 입력 (예: 환경)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                disabled={tags.length >= 5}
              />
              <Button
                variant="outline"
                onClick={handleAddTag}
                disabled={tags.length >= 5 || !tagInput.trim()}
              >
                추가
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    #{tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={loading || !content.trim()}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                작성 중...
              </>
            ) : (
              '게시하기'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
