import Link from 'next/link'
import { MapPin, Users, Calendar, Clock } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Activity } from '@/types'

interface ActivityCardProps {
  activity: Activity & {
    organization?: {
      id: string
      name: string
      logo?: string
      verified: boolean
    } | null
  }
  matchingScore?: number
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

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200',
}

export function ActivityCard({ activity, matchingScore }: ActivityCardProps) {
  const spotsLeft = activity.maxParticipants - activity.currentParticipants
  const isFull = spotsLeft <= 0
  const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0

  return (
    <Link href={`/activities/${activity.id}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden">
        {/* Thumbnail */}
        {activity.thumbnail && (
          <div className="relative h-48 bg-muted overflow-hidden">
            <img
              src={activity.thumbnail}
              alt={activity.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/600x400/0ea5e9/white?text=${encodeURIComponent(categoryLabels[activity.category])}`
              }}
            />
            {matchingScore && matchingScore >= 70 && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                {matchingScore}% 매칭
              </div>
            )}
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {categoryLabels[activity.category]}
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs ${difficultyColors[activity.difficulty]}`}
            >
              {difficultyLabels[activity.difficulty]}
            </Badge>
          </div>

          <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
            {activity.title}
          </h3>

          {activity.organization && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{activity.organization.name}</span>
              {activity.organization.verified && (
                <span className="text-blue-500">✓</span>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {activity.description}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{new Date(activity.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{activity.startTime} - {activity.endTime}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{activity.address.district}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>
                {activity.currentParticipants} / {activity.maxParticipants}명
                {isFull && <span className="ml-1 text-red-500 font-medium">모집완료</span>}
                {isAlmostFull && <span className="ml-1 text-orange-500 font-medium">마감임박</span>}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t">
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <span>조회 {activity.views}</span>
            {activity.avgRating > 0 && (
              <span>⭐ {activity.avgRating.toFixed(1)}</span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
