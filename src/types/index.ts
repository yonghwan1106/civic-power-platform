// ==================== Enums ====================

export type Category =
  | 'environment'  // 환경
  | 'education'    // 교육
  | 'welfare'      // 복지
  | 'culture'      // 문화
  | 'animal'       // 동물
  | 'disaster'     // 재난/안전
  | 'other'        // 기타

export type Difficulty = 'easy' | 'medium' | 'hard'

export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'weekend'

export type District = '처인구' | '기흥구' | '수지구'

export type ActivityStatus =
  | 'draft'      // 임시저장
  | 'open'       // 모집중
  | 'full'       // 모집완료
  | 'closed'     // 마감
  | 'completed'  // 활동완료
  | 'cancelled'  // 취소됨

export type ParticipationStatus =
  | 'applied'    // 신청
  | 'approved'   // 승인
  | 'rejected'   // 거절
  | 'attended'   // 참석
  | 'absent'     // 불참
  | 'cancelled'  // 취소

export type UserRole = 'citizen' | 'organization' | 'admin'

export type OrganizationType =
  | 'npo'              // 비영리단체
  | 'social-enterprise' // 사회적기업
  | 'cooperative'      // 협동조합
  | 'volunteer-center' // 자원봉사센터
  | 'government'       // 공공기관

export type AttendanceMethod = 'qr' | 'manual'

export type PostType = 'review' | 'story' | 'photo' | 'announcement'

// ==================== Coordinates ====================

export interface Coordinates {
  lat: number
  lng: number
}

// ==================== Address ====================

export interface Address {
  full: string
  district: District
  coordinates: Coordinates
}

// ==================== User ====================

export interface UserPreferences {
  categories: Category[]
  difficulty: Difficulty[]
  timeSlots: TimeSlot[]
  maxDistance: number // km
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone: string
  birthYear: number
  gender?: 'male' | 'female' | 'other'
  bio?: string
  interests: Category[]
  skills: string[]
  address: Address
  preferences: UserPreferences
  level: number
  totalHours: number
  totalActivities: number
  badges: string[] // badge IDs
  streak: number // 연속 참여 일수
  createdAt: string
  lastLoginAt: string
}

// ==================== Organization ====================

export interface OrganizationMember {
  userId: string
  role: 'owner' | 'admin' | 'member'
  joinedAt: string
}

export interface Organization {
  id: string
  name: string
  logo?: string
  coverImage?: string
  description: string
  category: OrganizationType
  phone: string
  email: string
  website?: string
  social?: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
  address: Address
  verified: boolean
  registrationNumber?: string
  totalActivities: number
  totalParticipants: number
  avgRating: number
  reviewCount: number
  members: OrganizationMember[]
  createdAt: string
  updatedAt: string
}

// ==================== Activity ====================

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly'
  daysOfWeek?: number[] // 0-6 (Sunday-Saturday)
  endDate?: string
}

export interface Activity {
  id: string
  organizationId: string
  title: string
  description: string
  category: Category
  tags: string[]
  date: string
  startTime: string
  endTime: string
  isRecurring: boolean
  recurringPattern?: RecurringPattern
  address: Address
  detailAddress?: string
  maxParticipants: number
  currentParticipants: number
  ageRestriction?: {
    min?: number
    max?: number
  }
  difficulty: Difficulty
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
  bookmarks: number
  applications: number
  avgRating: number
  reviewCount: number
  status: ActivityStatus
  createdAt: string
  updatedAt: string
}

// ==================== Participation ====================

export interface Participation {
  id: string
  userId: string
  activityId: string
  status: ParticipationStatus
  message?: string
  appliedAt: string
  approvedAt?: string
  approvedBy?: string
  rejectedAt?: string
  rejectedBy?: string
  rejectionReason?: string
  attendanceTime?: string
  attendanceMethod?: AttendanceMethod
  reviewed: boolean
  reviewId?: string
  certificateIssued: boolean
  certificateNumber?: string
}

// ==================== Review ====================

export interface DetailedRatings {
  organization: number // 1-5
  activity: number // 1-5
  communication: number // 1-5
}

export interface Review {
  id: string
  userId: string
  activityId: string
  organizationId: string
  rating: number // 1-5
  comment: string
  images: string[]
  detailedRatings: DetailedRatings
  helpful: number
  reported: number
  createdAt: string
  updatedAt: string
}

// ==================== Badge ====================

export interface Badge {
  id: string
  name: string
  icon: string
  description: string
  unlockedAt?: string
  progress?: number
}

// ==================== Post (Community) ====================

export interface PostAuthor {
  id: string
  name: string
  avatar?: string
  level: number
}

export interface ActivityReference {
  id: string
  name: string
  organization: string
}

export interface PostReactions {
  like: number
  love: number
  applause: number
}

export interface Comment {
  id: string
  author: PostAuthor
  content: string
  createdAt: string
  likes: number
}

export interface Post {
  id: string
  type: PostType
  author: PostAuthor
  activity?: ActivityReference
  content: string
  images: string[]
  tags: string[]
  reactions: PostReactions
  userReaction?: 'like' | 'love' | 'applause'
  comments: Comment[]
  createdAt: string
}

// ==================== Group ====================

export interface GroupLeader {
  id: string
  name: string
  avatar?: string
}

export interface Group {
  id: string
  name: string
  description: string
  category: Category
  thumbnail?: string
  isPublic: boolean
  memberCount: number
  leader: GroupLeader
  members: string[] // user IDs
  posts: string[] // post IDs
  upcomingMeetings: string[] // activity IDs
  createdAt: string
}

// ==================== Statistics ====================

export interface UserStats {
  totalHours: number
  totalActivities: number
  categoriesEngaged: Category[]
  favoriteCategory: Category
  averageRating: number
  badges: Badge[]
  level: number
  streak: number
  impactScore: number
}

export interface OrganizationStats {
  totalActivities: number
  totalParticipants: number
  totalHours: number
  averageRating: number
  categoryDistribution: Record<Category, number>
  monthlyTrend: Array<{
    month: string
    activities: number
    participants: number
    hours: number
  }>
}

export interface PlatformStats {
  totalUsers: number
  activeUsers: number
  totalOrganizations: number
  totalActivities: number
  totalParticipations: number
  totalHours: number
  civicPowerIndex: number
  districtStats: Record<District, {
    users: number
    activities: number
    participation: number
  }>
  categoryDistribution: Record<Category, number>
  monthlyTrend: Array<{
    month: string
    users: number
    activities: number
    hours: number
  }>
}

// ==================== Civic Power Index ====================

export interface CivicPowerIndexComponents {
  participation: number    // 0-100
  diversity: number        // 0-100
  sustainability: number   // 0-100
  impact: number          // 0-100
}

export interface CivicPowerIndex {
  overall: number // 0-100
  components: CivicPowerIndexComponents
  trend: 'up' | 'down' | 'stable'
  comparedToLastMonth: number // percentage change
}

// ==================== Matching ====================

export interface MatchingScore {
  total: number // 0-100
  breakdown: {
    category: number    // 0-30
    location: number    // 0-20
    time: number        // 0-20
    difficulty: number  // 0-15
    history: number     // 0-15
  }
  explanation: string
}

export interface RecommendedActivity extends Activity {
  matchingScore: MatchingScore
}

// ==================== API Response Types ====================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ==================== Filter Types ====================

export interface ActivityFilters {
  categories?: Category[]
  districts?: District[]
  difficulty?: Difficulty[]
  dateFrom?: string
  dateTo?: string
  status?: ActivityStatus[]
  search?: string
}

export interface SearchParams {
  query: string
  filters?: ActivityFilters
  sort?: 'relevance' | 'date' | 'popularity' | 'rating'
  page?: number
  pageSize?: number
}

// ==================== Certificate ====================

export type CertificateStatus = 'issued' | 'pending' | 'revoked'

export interface Certificate {
  id: string
  participationId: string
  userId: string
  userName: string
  activityId: string
  activityTitle: string
  activityDate: string
  organizationId: string
  organizationName: string
  hours: number
  certificateNumber: string
  status: CertificateStatus
  issuedAt: string
  issuedBy: string
  verificationUrl?: string
}
