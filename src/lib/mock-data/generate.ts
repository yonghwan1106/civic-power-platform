import type {
  User,
  Organization,
  Activity,
  Participation,
  Review,
  Post,
  Group,
  Badge,
  UserPreferences,
  OrganizationMember,
  Category,
  Certificate,
} from '@/types'

import {
  randomInt,
  randomFloat,
  randomItem,
  randomItems,
  randomBoolean,
  randomDate,
  formatDate,
  formatTime,
  generateId,
  generateKoreanName,
  generateYonginAddress,
  generateEmail,
  generatePhone,
  generateActivityTitle,
  generateActivityDescription,
  generateOrganizationName,
  calculateDistance,
  categories,
  difficulties,
  districts,
  organizationTypes,
  badgeData,
  activityRequirements,
  activityPreparation,
  reviewComments,
  postContents,
} from './generators'

// ==================== Generate Users ====================

export function generateUser(index: number): User {
  const name = generateKoreanName()
  const email = generateEmail(name)
  const address = generateYonginAddress()
  const birthYear = randomInt(1970, 2005)
  const level = randomInt(1, 10)
  const totalActivities = randomInt(0, 30)
  const avgHoursPerActivity = randomFloat(2, 4)
  const totalHours = Math.round(totalActivities * avgHoursPerActivity * 10) / 10

  // 관심사는 1-3개
  const interestCount = randomInt(1, 3)
  const interests = randomItems(categories, interestCount)

  // 선호 난이도
  const difficultyPrefs =
    level < 3 ? ['easy'] :
    level < 7 ? ['easy', 'medium'] :
    difficulties

  const createdAt = randomDate(
    new Date(2023, 0, 1),
    new Date(2024, 11, 1)
  ).toISOString()

  const lastLoginAt = randomDate(
    new Date(2024, 10, 1),
    new Date()
  ).toISOString()

  // 뱃지는 활동 수에 따라
  const earnedBadges: string[] = []
  if (totalActivities >= 1) earnedBadges.push('seedling')
  if (totalActivities >= 5) earnedBadges.push('sprout')
  if (totalActivities >= 20) earnedBadges.push('tree')
  if (randomBoolean(0.2)) earnedBadges.push('action-hero')
  if (randomBoolean(0.15)) earnedBadges.push('passionate')
  if (randomBoolean(0.1)) earnedBadges.push('influencer')

  const preferences: UserPreferences = {
    categories: interests,
    difficulty: difficultyPrefs as any,
    timeSlots: randomItems(['morning', 'afternoon', 'evening', 'weekend'], randomInt(1, 3)) as any,
    maxDistance: randomItem([5, 10, 15, 20]),
    notifications: {
      email: randomBoolean(0.8),
      push: randomBoolean(0.9),
      sms: randomBoolean(0.5),
    },
  }

  return {
    id: generateId('user-'),
    email,
    name,
    avatar: undefined, // UI-Avatars API fallback 사용
    phone: generatePhone(),
    birthYear,
    gender: randomItem(['male', 'female', 'other']),
    bio: randomBoolean(0.3) ? `안녕하세요! ${name}입니다. 지역사회에 기여하고 싶어요.` : undefined,
    interests,
    skills: randomItems(['의사소통', '리더십', '기획', '디자인', '사진', 'IT'], randomInt(1, 3)),
    address,
    preferences,
    level,
    totalHours,
    totalActivities,
    badges: earnedBadges,
    streak: randomInt(0, 15),
    createdAt,
    lastLoginAt,
  }
}

export function generateUsers(count: number): User[] {
  return Array.from({ length: count }, (_, i) => generateUser(i))
}

// ==================== Generate Organizations ====================

export function generateOrganization(index: number): Organization {
  const type = randomItem(organizationTypes)
  const name = generateOrganizationName(type)
  const address = generateYonginAddress()
  const totalActivities = randomInt(2, 20)
  const totalParticipants = totalActivities * randomInt(10, 30)
  const avgRating = randomFloat(3.5, 5.0)
  const reviewCount = Math.floor(totalParticipants * randomFloat(0.3, 0.6))

  const createdAt = randomDate(
    new Date(2020, 0, 1),
    new Date(2024, 0, 1)
  ).toISOString()

  const members: OrganizationMember[] = [
    {
      userId: generateId('user-'),
      role: 'owner',
      joinedAt: createdAt,
    },
  ]

  // 추가 멤버 1-3명
  const memberCount = randomInt(1, 3)
  for (let i = 0; i < memberCount; i++) {
    members.push({
      userId: generateId('user-'),
      role: randomItem(['admin', 'member']),
      joinedAt: randomDate(new Date(createdAt), new Date()).toISOString(),
    })
  }

  return {
    id: generateId('org-'),
    name,
    logo: undefined, // UI-Avatars API fallback 사용 (organization 페이지의 onError 핸들러)
    coverImage: undefined,
    description: `${name}는 용인시 지역사회를 위해 활동하는 ${type === 'npo' ? '비영리단체' : type === 'social-enterprise' ? '사회적기업' : type === 'volunteer-center' ? '자원봉사센터' : '협동조합'}입니다.`,
    category: type,
    phone: generatePhone(),
    email: `info@${name.replace(/\s/g, '')}.or.kr`,
    website: randomBoolean(0.6) ? `https://www.${name.replace(/\s/g, '')}.or.kr` : undefined,
    social: randomBoolean(0.4) ? {
      facebook: `facebook.com/${name.replace(/\s/g, '')}`,
      instagram: randomBoolean(0.7) ? `@${name.replace(/\s/g, '')}_official` : undefined,
    } : undefined,
    address,
    verified: randomBoolean(0.8),
    registrationNumber: randomBoolean(0.7) ? `${randomInt(100, 999)}-${randomInt(10, 99)}-${randomInt(10000, 99999)}` : undefined,
    totalActivities,
    totalParticipants,
    avgRating: Math.round(avgRating * 10) / 10,
    reviewCount,
    members,
    createdAt,
    updatedAt: randomDate(new Date(createdAt), new Date()).toISOString(),
  }
}

export function generateOrganizations(count: number): Organization[] {
  return Array.from({ length: count }, (_, i) => generateOrganization(i))
}

// ==================== Generate Activities ====================

export function generateActivity(
  index: number,
  organizations: Organization[]
): Activity {
  const org = randomItem(organizations)
  const category = randomItem(categories)
  const title = generateActivityTitle(category)
  const description = generateActivityDescription(title, category)
  const difficulty = randomItem(difficulties)

  // 날짜: 과거 30%, 현재/미래 70%
  const isPast = randomBoolean(0.3)
  const date = isPast
    ? randomDate(new Date(2024, 0, 1), new Date(2024, 10, 1))
    : randomDate(new Date(), new Date(2025, 3, 1))

  const startHour = randomInt(9, 17)
  const duration = randomInt(2, 4)
  const endHour = startHour + duration

  const maxParticipants = randomInt(5, 30)
  const currentParticipants = isPast
    ? randomInt(Math.floor(maxParticipants * 0.7), maxParticipants)
    : randomInt(0, Math.floor(maxParticipants * 0.8))

  const status = isPast
    ? 'completed'
    : currentParticipants >= maxParticipants
    ? 'full'
    : 'open'

  const address = randomBoolean(0.7) ? generateYonginAddress() : org.address

  const createdAt = randomDate(
    new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000),
    date
  ).toISOString()

  const views = randomInt(10, 500)
  const applications = currentParticipants + randomInt(0, 5)
  const reviewCount = isPast ? Math.floor(currentParticipants * randomFloat(0.3, 0.5)) : 0
  const avgRating = reviewCount > 0 ? randomFloat(3.5, 5.0) : 0

  return {
    id: generateId('activity-'),
    organizationId: org.id,
    title,
    description,
    category,
    tags: randomItems(['봉사', '환경', '교육', '나눔', '지역사회', '청년', '어린이'], randomInt(2, 4)),
    date: formatDate(date),
    startTime: formatTime(startHour),
    endTime: formatTime(endHour),
    isRecurring: randomBoolean(0.1),
    recurringPattern: undefined, // 간단히 하기 위해 생략
    address,
    detailAddress: randomBoolean(0.5) ? `${randomInt(1, 10)}층 ${randomInt(100, 999)}호` : undefined,
    maxParticipants,
    currentParticipants,
    ageRestriction: randomBoolean(0.3) ? {
      min: randomItem([14, 16, 18, 19]),
      max: undefined,
    } : undefined,
    difficulty,
    requirements: randomItems(activityRequirements, randomInt(2, 4)),
    preparation: randomItems(activityPreparation, randomInt(1, 3)),
    notices: ['활동 30분 전까지 도착해주세요.', '우천 시 일정이 변경될 수 있습니다.'],
    benefits: ['봉사시간 인증', '간식 제공'],
    images: [],
    thumbnail: undefined, // undefined로 설정하여 activity-card의 getCategoryImage fallback 사용
    contact: {
      name: randomItem(org.members).userId,
      phone: org.phone,
      email: org.email,
    },
    views,
    bookmarks: Math.floor(views * randomFloat(0.05, 0.15)),
    applications,
    avgRating: Math.round(avgRating * 10) / 10,
    reviewCount,
    status,
    createdAt,
    updatedAt: createdAt,
  }
}

export function generateActivities(
  count: number,
  organizations: Organization[]
): Activity[] {
  return Array.from({ length: count }, (_, i) => generateActivity(i, organizations))
}

// ==================== Generate Participations ====================

export function generateParticipation(
  user: User,
  activity: Activity
): Participation {
  const isCompleted = activity.status === 'completed'
  const status = isCompleted
    ? randomBoolean(0.9) ? 'attended' : 'absent'
    : randomBoolean(0.8) ? 'approved' : 'applied'

  const appliedAt = randomDate(
    new Date(new Date(activity.createdAt).getTime()),
    new Date(activity.date)
  ).toISOString()

  const approvedAt = status !== 'applied'
    ? randomDate(new Date(appliedAt), new Date(activity.date)).toISOString()
    : undefined

  const reviewed = isCompleted && status === 'attended' && randomBoolean(0.4)

  return {
    id: generateId('participation-'),
    userId: user.id,
    activityId: activity.id,
    status,
    message: randomBoolean(0.3) ? '열심히 참여하겠습니다!' : undefined,
    appliedAt,
    approvedAt,
    approvedBy: approvedAt ? generateId('user-') : undefined,
    attendanceTime: status === 'attended' ? activity.date + 'T' + activity.startTime : undefined,
    attendanceMethod: status === 'attended' ? randomItem(['qr', 'manual']) : undefined,
    reviewed,
    reviewId: reviewed ? generateId('review-') : undefined,
    certificateIssued: status === 'attended',
    certificateNumber: status === 'attended' ? `CERT-${randomInt(100000, 999999)}` : undefined,
  }
}

export function generateParticipations(
  users: User[],
  activities: Activity[],
  targetCount: number
): Participation[] {
  const participations: Participation[] = []
  const usedPairs = new Set<string>()

  while (participations.length < targetCount) {
    const user = randomItem(users)
    const activity = randomItem(activities)
    const pairKey = `${user.id}-${activity.id}`

    if (!usedPairs.has(pairKey) && activity.currentParticipants > 0) {
      usedPairs.add(pairKey)
      participations.push(generateParticipation(user, activity))
    }
  }

  return participations
}

// ==================== Generate Reviews ====================

export function generateReview(
  participation: Participation,
  activity: Activity
): Review {
  const rating = randomInt(3, 5)
  const comment = randomItem(reviewComments)

  return {
    id: participation.reviewId || generateId('review-'),
    userId: participation.userId,
    activityId: activity.id,
    organizationId: activity.organizationId,
    rating,
    comment,
    images: randomBoolean(0.3) ? [`/review-images/${randomInt(1, 20)}.jpg`] : [],
    detailedRatings: {
      organization: randomInt(rating - 1, 5),
      activity: rating,
      communication: randomInt(rating - 1, 5),
    },
    helpful: randomInt(0, 20),
    reported: 0,
    createdAt: randomDate(
      new Date(participation.appliedAt),
      new Date()
    ).toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export function generateReviews(
  participations: Participation[],
  activities: Activity[]
): Review[] {
  const reviewedParticipations = participations.filter(p => p.reviewed)

  return reviewedParticipations.map(participation => {
    const activity = activities.find(a => a.id === participation.activityId)!
    return generateReview(participation, activity)
  })
}

// ==================== Generate Posts ====================

export function generatePost(
  index: number,
  users: User[],
  activities: Activity[]
): Post {
  const author = randomItem(users)
  const activity = randomBoolean(0.7) ? randomItem(activities.filter(a => a.status === 'completed')) : undefined

  const content = randomItem(postContents)
  const type = randomItem(['review', 'story', 'photo'])

  return {
    id: generateId('post-'),
    type: type as any,
    author: {
      id: author.id,
      name: author.name,
      avatar: author.avatar,
      level: author.level,
    },
    activity: activity ? {
      id: activity.id,
      name: activity.title,
      organization: activity.organizationId,
    } : undefined,
    content,
    images: type === 'photo' ? [`/post-images/${randomInt(1, 30)}.jpg`] : [],
    tags: randomItems(['봉사', '후기', '감동', '추천', '용인'], randomInt(1, 3)),
    reactions: {
      like: randomInt(5, 50),
      love: randomInt(2, 30),
      applause: randomInt(1, 20),
    },
    userReaction: randomBoolean(0.3) ? randomItem(['like', 'love', 'applause']) : undefined,
    comments: [],
    createdAt: randomDate(new Date(2024, 9, 1), new Date()).toISOString(),
  }
}

export function generatePosts(
  count: number,
  users: User[],
  activities: Activity[]
): Post[] {
  return Array.from({ length: count }, (_, i) => generatePost(i, users, activities))
}

// ==================== Generate Certificates ====================

export function generateCertificate(
  participation: Participation,
  user: User,
  activity: Activity,
  organization: Organization
): Certificate {
  const startHour = parseInt(activity.startTime.split(':')[0])
  const endHour = parseInt(activity.endTime.split(':')[0])
  const hours = endHour - startHour

  return {
    id: generateId('cert-'),
    participationId: participation.id,
    userId: user.id,
    userName: user.name,
    activityId: activity.id,
    activityTitle: activity.title,
    activityDate: activity.date,
    organizationId: organization.id,
    organizationName: organization.name,
    hours,
    certificateNumber: participation.certificateNumber || `CERT-${randomInt(100000, 999999)}`,
    status: 'issued',
    issuedAt: randomDate(new Date(activity.date), new Date()).toISOString(),
    issuedBy: organization.name,
    verificationUrl: `https://civic-power.vercel.app/verify/${participation.certificateNumber}`,
  }
}

export function generateCertificates(
  participations: Participation[],
  users: User[],
  activities: Activity[],
  organizations: Organization[]
): Certificate[] {
  const certificates: Certificate[] = []

  const attendedParticipations = participations.filter(
    p => p.status === 'attended' && p.certificateIssued
  )

  for (const participation of attendedParticipations) {
    const user = users.find(u => u.id === participation.userId)
    const activity = activities.find(a => a.id === participation.activityId)

    if (user && activity) {
      const organization = organizations.find(o => o.id === activity.organizationId)
      if (organization) {
        certificates.push(generateCertificate(participation, user, activity, organization))
      }
    }
  }

  return certificates
}

// ==================== Generate All Mock Data ====================

export function generateAllMockData() {
  console.log('Generating mock data...')

  const users = generateUsers(500)
  console.log(`✓ Generated ${users.length} users`)

  const organizations = generateOrganizations(50)
  console.log(`✓ Generated ${organizations.length} organizations`)

  const activities = generateActivities(200, organizations)
  console.log(`✓ Generated ${activities.length} activities`)

  const participations = generateParticipations(users, activities, 2000)
  console.log(`✓ Generated ${participations.length} participations`)

  const reviews = generateReviews(participations, activities)
  console.log(`✓ Generated ${reviews.length} reviews`)

  const posts = generatePosts(300, users, activities)
  console.log(`✓ Generated ${posts.length} posts`)

  const certificates = generateCertificates(participations, users, activities, organizations)
  console.log(`✓ Generated ${certificates.length} certificates`)

  const badges: Badge[] = badgeData.map(b => ({
    id: b.id,
    name: b.name,
    icon: b.icon,
    description: b.description,
  }))

  return {
    users,
    organizations,
    activities,
    participations,
    reviews,
    posts,
    certificates,
    badges,
  }
}
