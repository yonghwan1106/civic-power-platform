import type { User, Activity, MatchingScore, RecommendedActivity } from '@/types'
import { calculateDistance } from './mock-data/generators'

/**
 * AI 매칭 알고리즘
 *
 * 가중치:
 * - 관심 카테고리 일치: 30%
 * - 위치 접근성: 20%
 * - 시간 가용성: 20%
 * - 난이도 적합성: 15%
 * - 과거 참여 이력 유사도: 15%
 */
export function calculateMatchingScore(
  user: User,
  activity: Activity
): MatchingScore {
  let categoryScore = 0
  let locationScore = 0
  let timeScore = 0
  let difficultyScore = 0
  let historyScore = 0

  // 1. 카테고리 매칭 (0-30점)
  if (user.interests.includes(activity.category)) {
    categoryScore = 30
  } else if (user.interests.length > 0) {
    // 관련 카테고리인 경우 부분 점수
    categoryScore = 10
  }

  // 2. 위치 매칭 (0-20점)
  const distance = calculateDistance(
    user.address.coordinates,
    activity.address.coordinates
  )

  if (distance < 5) {
    locationScore = 20
  } else if (distance < 10) {
    locationScore = 15
  } else if (distance < 15) {
    locationScore = 10
  } else if (distance < 20) {
    locationScore = 5
  } else {
    locationScore = 0
  }

  // 3. 시간 매칭 (0-20점)
  // 활동 날짜의 요일과 시간대 확인
  const activityDate = new Date(activity.date)
  const dayOfWeek = activityDate.getDay()
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
  const startHour = parseInt(activity.startTime.split(':')[0])

  let activityTimeSlot: string
  if (isWeekend) {
    activityTimeSlot = 'weekend'
  } else if (startHour < 12) {
    activityTimeSlot = 'morning'
  } else if (startHour < 17) {
    activityTimeSlot = 'afternoon'
  } else {
    activityTimeSlot = 'evening'
  }

  if (user.preferences.timeSlots.includes(activityTimeSlot as any)) {
    timeScore = 20
  } else if (user.preferences.timeSlots.includes('weekend') && isWeekend) {
    timeScore = 15
  } else {
    timeScore = 5
  }

  // 4. 난이도 매칭 (0-15점)
  if (user.preferences.difficulty.includes(activity.difficulty)) {
    difficultyScore = 15
  } else {
    // 레벨에 따른 적절한 난이도
    const userLevel = user.level
    if (activity.difficulty === 'easy' && userLevel < 3) {
      difficultyScore = 10
    } else if (activity.difficulty === 'medium' && userLevel >= 3 && userLevel < 7) {
      difficultyScore = 10
    } else if (activity.difficulty === 'hard' && userLevel >= 7) {
      difficultyScore = 10
    } else {
      difficultyScore = 5
    }
  }

  // 5. 과거 이력 매칭 (0-15점)
  // 사용자가 선호하는 카테고리에서의 활동 경험
  if (user.totalActivities > 0) {
    if (user.interests.includes(activity.category)) {
      historyScore = 15
    } else {
      historyScore = 8
    }
  } else {
    // 신규 사용자는 기본 점수
    historyScore = 10
  }

  const total = categoryScore + locationScore + timeScore + difficultyScore + historyScore

  // 설명 생성
  const explanation = generateExplanation({
    category: categoryScore,
    location: locationScore,
    time: timeScore,
    difficulty: difficultyScore,
    history: historyScore,
  }, distance)

  return {
    total,
    breakdown: {
      category: categoryScore,
      location: locationScore,
      time: timeScore,
      difficulty: difficultyScore,
      history: historyScore,
    },
    explanation,
  }
}

function generateExplanation(
  breakdown: MatchingScore['breakdown'],
  distance: number
): string {
  const reasons: string[] = []

  if (breakdown.category >= 25) {
    reasons.push('관심 분야와 일치합니다')
  } else if (breakdown.category >= 15) {
    reasons.push('관심 분야와 유사합니다')
  }

  if (breakdown.location >= 15) {
    reasons.push(`가까운 거리입니다 (${distance.toFixed(1)}km)`)
  } else if (breakdown.location >= 10) {
    reasons.push(`이동 가능한 거리입니다 (${distance.toFixed(1)}km)`)
  }

  if (breakdown.time >= 15) {
    reasons.push('선호하는 시간대입니다')
  }

  if (breakdown.difficulty >= 12) {
    reasons.push('적절한 난이도입니다')
  }

  if (breakdown.history >= 12) {
    reasons.push('이전 활동 경험과 일치합니다')
  }

  return reasons.length > 0
    ? reasons.join(', ')
    : '새로운 경험을 시도해보세요!'
}

export function getRecommendations(
  user: User,
  activities: Activity[],
  limit: number = 8
): RecommendedActivity[] {
  // 열린 상태의 활동만 필터링
  const openActivities = activities.filter(a =>
    a.status === 'open' &&
    new Date(a.date) > new Date() &&
    a.currentParticipants < a.maxParticipants
  )

  // 각 활동에 대해 매칭 점수 계산
  const scoredActivities = openActivities.map(activity => ({
    ...activity,
    matchingScore: calculateMatchingScore(user, activity),
  }))

  // 점수순으로 정렬
  scoredActivities.sort((a, b) => b.matchingScore.total - a.matchingScore.total)

  // 다양성 필터 적용 (같은 카테고리가 너무 많이 나오지 않도록)
  const diverseActivities: RecommendedActivity[] = []
  const categoryCount: Record<string, number> = {}

  for (const activity of scoredActivities) {
    const count = categoryCount[activity.category] || 0

    // 각 카테고리당 최대 3개까지
    if (count < 3) {
      diverseActivities.push(activity)
      categoryCount[activity.category] = count + 1
    }

    if (diverseActivities.length >= limit) {
      break
    }
  }

  // 아직 limit에 도달하지 못했다면 나머지 활동 추가
  if (diverseActivities.length < limit) {
    const remaining = scoredActivities.filter(
      a => !diverseActivities.find(d => d.id === a.id)
    )
    diverseActivities.push(...remaining.slice(0, limit - diverseActivities.length))
  }

  return diverseActivities
}
