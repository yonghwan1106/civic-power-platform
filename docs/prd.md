# 시민력 플랫폼 PRD (Product Requirements Document)

## 📋 문서 정보

- **프로젝트명**: 시민력(市民力) 플랫폼
- **버전**: v1.0.0 (Prototype)
- **작성일**: 2025-11-20
- **목적**: 시민 공감 아이디어 공모전 제출용 실제 동작 프로토타입 개발

---

## 1. 제품 개요

### 1.1 비전
AI 기술을 활용하여 시민과 지역 공익활동을 효과적으로 연결하고, 시민사회단체의 활동을 체계적으로 지원하는 통합 플랫폼

### 1.2 핵심 가치 제안
- 시민의 관심사와 역량에 맞는 공익활동 자동 매칭
- 시민사회단체의 활동 홍보 및 자원 연결 지원
- 데이터 기반 공익활동 성과 측정 및 가시화
- 지역 특성을 반영한 맞춤형 시민참여 생태계 조성

### 1.3 목표 사용자
- **시민**: 20-50대, 공익활동에 관심 있는 개인
- **단체**: 비영리단체, 사회적 기업, 자원봉사센터 운영자
- **관리자**: 지자체 담당자, 플랫폼 운영자

---

## 2. 기술 스택

### 2.1 프론트엔드
```
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + shadcn/ui
- State Management: Zustand
- Data Fetching: React Query (TanStack Query)
- Charts: Recharts
- Forms: React Hook Form + Zod
- Maps: React Leaflet
- Date: date-fns
- Icons: Lucide React
```

### 2.2 백엔드 (Mock)
```
- API Routes: Next.js API Routes
- Mock Data: JSON files + in-memory storage
- AI Simulation: Rule-based matching algorithm
```

### 2.3 배포
```
- Platform: Vercel
- Domain: 커스텀 도메인 (선택)
```

---

## 3. 사용자 페르소나

### 페르소나 1: 김서연 (시민)
- **나이**: 32세
- **직업**: IT 회사 마케터
- **거주지**: 용인시 기흥구
- **특징**: 주말에 의미있는 활동을 하고 싶지만 정보를 찾기 어려움
- **니즈**: 자신의 관심사와 스케줄에 맞는 봉사활동 추천

### 페르소나 2: 박민수 (단체 운영자)
- **나이**: 45세
- **직업**: 지역 환경보호 NPO 대표
- **거주지**: 용인시 수지구
- **특징**: 자원봉사자 모집에 어려움, 디지털 역량 부족
- **니즈**: 쉬운 활동 등록 및 자원봉사자 관리

### 페르소나 3: 이정호 (지자체 담당자)
- **나이**: 38세
- **직업**: 용인시청 시민사회팀 주무관
- **특징**: 지역 시민사회 활성화 정책 수립 및 평가 담당
- **니즈**: 데이터 기반 정책 의사결정 자료

---

## 4. 정보 구조 (IA)

```
시민력 플랫폼
├── 메인 페이지 (/)
│   ├── 히어로 섹션
│   ├── 추천 활동 (AI 매칭)
│   ├── 인기 활동
│   └── 주요 통계
│
├── 활동 찾기 (/activities)
│   ├── 필터 (카테고리, 지역, 날짜, 난이도)
│   ├── 검색
│   ├── 목록/지도 뷰
│   └── 활동 상세 (/activities/[id])
│       ├── 활동 정보
│       ├── 단체 정보
│       ├── 리뷰
│       └── 신청하기
│
├── 마이 페이지 (/my)
│   ├── 대시보드
│   ├── 내 활동 (예정/완료)
│   ├── 활동 이력
│   ├── 배지 & 등급
│   ├── 관심 활동
│   └── 설정
│
├── 단체 포털 (/organization)
│   ├── 대시보드
│   ├── 활동 관리
│   │   ├── 활동 목록
│   │   ├── 활동 등록
│   │   └── 활동 수정
│   ├── 참여자 관리
│   ├── 통계 & 리포트
│   └── 단체 정보 관리
│
├── 커뮤니티 (/community)
│   ├── 피드 (후기, 사진)
│   ├── 소모임
│   ├── 공지사항
│   └── FAQ
│
├── 통계 (/stats)
│   ├── 지역별 현황
│   ├── 활동 트렌드
│   ├── 참여 통계
│   └── 영향력 지표
│
└── 인증 (/auth)
    ├── 로그인
    ├── 회원가입
    └── 프로필 설정
```

---

## 5. 주요 기능 명세

### 5.1 공통 기능

#### 5.1.1 네비게이션
- **위치**: 고정 헤더
- **구성요소**:
  - 로고 (홈으로 이동)
  - 주요 메뉴: 활동 찾기, 커뮤니티, 통계
  - 사용자 메뉴: 알림, 프로필, 로그아웃
  - 모바일: 햄버거 메뉴

#### 5.1.2 검색
- **검색 대상**: 활동명, 활동 내용, 단체명, 지역
- **필터 옵션**:
  - 카테고리: 환경, 교육, 복지, 문화, 동물, 기타
  - 지역: 용인시 전체, 처인구, 기흥구, 수지구
  - 날짜: 오늘, 이번 주, 이번 달, 기간 설정
  - 난이도: 쉬움, 보통, 어려움
  - 시간대: 오전, 오후, 저녁, 주말
- **정렬**: 관련도순, 최신순, 인기순, 마감임박순

### 5.2 메인 페이지 (/)

#### 5.2.1 히어로 섹션
```typescript
interface HeroSection {
  title: string;          // "당신의 시민력을 발견하세요"
  subtitle: string;       // "AI가 추천하는 맞춤형 공익활동"
  cta: {
    primary: string;      // "활동 찾기"
    secondary: string;    // "플랫폼 소개"
  };
  backgroundImage: string;
}
```

#### 5.2.2 AI 추천 활동 섹션
```typescript
interface RecommendedActivities {
  title: string;          // "김서연님을 위한 추천 활동"
  matchingScore: number;  // 0-100
  activities: Activity[]; // 최대 4개
  reason: string;         // 추천 이유
}
```

**추천 알고리즘 시뮬레이션**:
```typescript
function calculateMatchingScore(
  user: UserProfile,
  activity: Activity
): number {
  const categoryMatch = user.interests.includes(activity.category) ? 30 : 0;
  const locationMatch = calculateDistance(user.location, activity.location) < 5 ? 20 : 10;
  const timeMatch = isAvailable(user.schedule, activity.schedule) ? 20 : 0;
  const difficultyMatch = Math.abs(user.experienceLevel - activity.difficulty) < 2 ? 15 : 0;
  const historyMatch = calculateHistorySimilarity(user.history, activity.category) * 15;
  
  return categoryMatch + locationMatch + timeMatch + difficultyMatch + historyMatch;
}
```

#### 5.2.3 주요 통계
```typescript
interface Statistics {
  totalParticipants: number;    // 누적 참여자
  totalActivities: number;      // 진행된 활동
  totalHours: number;           // 봉사 시간
  totalOrganizations: number;   // 참여 단체
}
```

### 5.3 활동 찾기 페이지 (/activities)

#### 5.3.1 활동 카드
```typescript
interface ActivityCard {
  id: string;
  title: string;
  organization: {
    id: string;
    name: string;
    logo: string;
  };
  category: Category;
  location: {
    address: string;
    district: string;  // 처인구, 기흥구, 수지구
    coordinates: [number, number];
  };
  date: {
    start: Date;
    end: Date;
  };
  participants: {
    current: number;
    max: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  thumbnail: string;
  matchingScore?: number;  // 로그인 시
  isBookmarked?: boolean;  // 로그인 시
}
```

#### 5.3.2 지도 뷰
- **라이브러리**: React Leaflet
- **기능**:
  - 활동 위치 마커 표시
  - 마커 클릭 시 활동 미리보기 팝업
  - 지도 이동 시 해당 영역 활동 필터링
  - 현재 위치 표시 (위치 권한 허용 시)

#### 5.3.3 활동 상세 페이지 (/activities/[id])

**레이아웃**:
```
┌─────────────────────────────────────┐
│ 활동 이미지 갤러리                   │
├─────────────────────────────────────┤
│ 제목 & 카테고리 배지                 │
│ 단체 정보                            │
│ 매칭 점수 (AI 추천)                  │
├─────────────────────────────────────┤
│ 📅 일시                              │
│ 📍 위치                              │
│ 👥 모집 인원                         │
│ ⏱️ 예상 시간                         │
│ 📊 난이도                            │
├─────────────────────────────────────┤
│ 활동 소개                            │
│ 준비물                               │
│ 유의사항                             │
├─────────────────────────────────────┤
│ 지도                                 │
├─────────────────────────────────────┤
│ 리뷰 (⭐ 평점)                       │
├─────────────────────────────────────┤
│ [신청하기] [관심 등록]               │
└─────────────────────────────────────┘
```

```typescript
interface ActivityDetail extends ActivityCard {
  description: string;
  requirements: string[];
  preparation: string[];
  notices: string[];
  benefits: string[];  // 활동 혜택 (봉사 시간 인정 등)
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  reviews: Review[];
  images: string[];
  relatedActivities: ActivityCard[];
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;  // 1-5
  comment: string;
  images: string[];
  createdAt: Date;
  helpful: number;  // 도움됨 카운트
}
```

### 5.4 마이 페이지 (/my)

#### 5.4.1 대시보드

```typescript
interface UserDashboard {
  profile: {
    name: string;
    avatar: string;
    level: number;        // 1-10
    levelProgress: number; // 0-100%
    totalHours: number;
    totalActivities: number;
    badges: Badge[];
  };
  upcomingActivities: Activity[];
  recentActivities: Activity[];
  recommendations: Activity[];
  stats: {
    thisMonth: {
      activities: number;
      hours: number;
    };
    streak: number;  // 연속 참여 일수
  };
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: Date;
  progress?: number;  // 미획득 배지의 경우
}
```

**배지 종류**:
- 🌱 씨앗: 첫 활동 참여
- 🌿 새싹: 5회 참여
- 🌳 나무: 20회 참여
- 🏃 액션러: 3회 연속 참여
- ❤️ 열정: 한 달 10시간 이상
- 🌟 인플루언서: 리뷰 10개 작성
- 🎯 전문가: 한 카테고리 10회 참여
- 🌍 탐험가: 5개 지역 활동 참여

#### 5.4.2 내 활동
- **탭**: 예정된 활동, 완료된 활동, 취소된 활동
- **기능**:
  - 활동 상세 보기
  - 일정 캘린더에 추가
  - 길 안내 (지도 앱 연동)
  - 출석 체크 (QR 코드 스캔)
  - 리뷰 작성

#### 5.4.3 활동 이력
```typescript
interface ActivityHistory {
  year: number;
  totalHours: number;
  totalActivities: number;
  byCategory: {
    [key: string]: {
      count: number;
      hours: number;
    };
  };
  byMonth: {
    month: number;
    count: number;
    hours: number;
  }[];
  certificates: Certificate[];
}

interface Certificate {
  id: string;
  activityId: string;
  activityName: string;
  organizationName: string;
  date: Date;
  hours: number;
  certificateNumber: string;
  downloadUrl: string;
}
```

### 5.5 단체 포털 (/organization)

#### 5.5.1 대시보드

```typescript
interface OrganizationDashboard {
  organization: {
    name: string;
    logo: string;
    description: string;
    category: string;
    verified: boolean;
  };
  stats: {
    totalActivities: number;
    activeActivities: number;
    totalParticipants: number;
    avgRating: number;
    thisMonth: {
      activities: number;
      participants: number;
    };
  };
  upcomingActivities: Activity[];
  pendingApplications: Application[];
  recentReviews: Review[];
}

interface Application {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  activityId: string;
  activityName: string;
  appliedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
}
```

#### 5.5.2 활동 관리

**활동 등록 폼**:
```typescript
interface ActivityForm {
  // 기본 정보
  title: string;
  category: Category;
  description: string;
  
  // 일정
  date: Date;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
  recurringPattern?: {
    frequency: 'weekly' | 'biweekly' | 'monthly';
    endDate: Date;
  };
  
  // 장소
  location: {
    address: string;
    detailAddress: string;
    coordinates: [number, number];
  };
  
  // 참여자
  maxParticipants: number;
  minAge: number;
  maxAge?: number;
  
  // 활동 상세
  difficulty: 'easy' | 'medium' | 'hard';
  requirements: string[];
  preparation: string[];
  notices: string[];
  benefits: string[];
  
  // 미디어
  images: File[];
  
  // 연락처
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}
```

**활동 목록 뷰**:
- 상태별 필터: 모집중, 모집완료, 진행중, 완료
- 정렬: 최신순, 시작일순, 인기순
- 액션: 수정, 복사, 마감, 취소, 삭제

#### 5.5.3 참여자 관리

```typescript
interface ParticipantManagement {
  activityId: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    email: string;
    appliedAt: Date;
    status: 'registered' | 'attended' | 'absent' | 'cancelled';
    attendanceTime?: Date;
    notes?: string;
  }[];
  statistics: {
    registered: number;
    attended: number;
    absent: number;
    attendanceRate: number;
  };
}
```

**기능**:
- 참여자 검색/필터
- 출석 체크 (QR 코드 생성)
- 일괄 메시지 발송
- Excel 다운로드
- 확인서 일괄 발급

#### 5.5.4 통계 & 리포트

```typescript
interface OrganizationStats {
  overview: {
    period: string;
    totalActivities: number;
    totalParticipants: number;
    totalHours: number;
    avgRating: number;
  };
  trends: {
    date: string;
    activities: number;
    participants: number;
  }[];
  categoryDistribution: {
    category: string;
    count: number;
    percentage: number;
  }[];
  participantDemographics: {
    ageGroup: string;
    count: number;
  }[];
  topActivities: {
    activityId: string;
    activityName: string;
    participants: number;
    rating: number;
  }[];
}
```

### 5.6 커뮤니티 (/community)

#### 5.6.1 피드

```typescript
interface Post {
  id: string;
  type: 'review' | 'story' | 'photo' | 'announcement';
  author: {
    id: string;
    name: string;
    avatar: string;
    level: number;
  };
  activity?: {
    id: string;
    name: string;
    organization: string;
  };
  content: string;
  images: string[];
  tags: string[];
  reactions: {
    like: number;
    love: number;
    applause: number;
  };
  userReaction?: string;
  comments: Comment[];
  createdAt: Date;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
}
```

**피드 정렬**:
- 최신순
- 인기순 (반응 많은 순)
- 팔로잉만

#### 5.6.2 소모임

```typescript
interface Group {
  id: string;
  name: string;
  description: string;
  category: Category;
  thumbnail: string;
  memberCount: number;
  isPublic: boolean;
  leader: {
    id: string;
    name: string;
    avatar: string;
  };
  members: User[];
  posts: Post[];
  upcomingMeetings: Meeting[];
}

interface Meeting {
  id: string;
  groupId: string;
  title: string;
  date: Date;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
}
```

### 5.7 통계 페이지 (/stats)

#### 5.7.1 전체 통계

```typescript
interface PlatformStats {
  summary: {
    totalUsers: number;
    totalActivities: number;
    totalHours: number;
    totalOrganizations: number;
    activeUsers: number;  // 최근 30일
  };
  
  trends: {
    daily: {
      date: string;
      users: number;
      activities: number;
      hours: number;
    }[];
    monthly: {
      month: string;
      users: number;
      activities: number;
      hours: number;
    }[];
  };
  
  regional: {
    district: string;
    activities: number;
    participants: number;
    hours: number;
  }[];
  
  categoryDistribution: {
    category: string;
    count: number;
    percentage: number;
    growth: number;  // 전월 대비
  }[];
  
  topOrganizations: {
    organizationId: string;
    name: string;
    activities: number;
    participants: number;
    rating: number;
  }[];
}
```

#### 5.7.2 시민력 지수 (Civic Power Index)

```typescript
interface CivicPowerIndex {
  score: number;  // 0-100
  components: {
    participation: {
      score: number;
      description: string;
      data: {
        activeUserRate: number;
        avgActivitiesPerUser: number;
      };
    };
    diversity: {
      score: number;
      description: string;
      data: {
        categoryDiversity: number;
        ageDiversity: number;
        regionalDiversity: number;
      };
    };
    sustainability: {
      score: number;
      description: string;
      data: {
        retentionRate: number;
        recurringParticipation: number;
      };
    };
    impact: {
      score: number;
      description: string;
      data: {
        beneficiaries: number;
        socialValue: number;  // 원 단위
      };
    };
  };
  historicalData: {
    month: string;
    score: number;
  }[];
}
```

---

## 6. 데이터 모델

### 6.1 사용자 (User)

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  phone: string;
  birthYear: number;
  gender: 'male' | 'female' | 'other';
  
  // 프로필
  bio: string;
  interests: Category[];
  skills: string[];
  
  // 위치
  address: {
    district: string;  // 처인구, 기흥구, 수지구
    coordinates: [number, number];
  };
  
  // 선호도
  preferences: {
    categories: Category[];
    difficulty: ('easy' | 'medium' | 'hard')[];
    timeSlots: ('morning' | 'afternoon' | 'evening' | 'weekend')[];
    maxDistance: number;  // km
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
  
  // 통계
  stats: {
    level: number;
    totalHours: number;
    totalActivities: number;
    badges: string[];
    streak: number;
  };
  
  // 메타
  createdAt: Date;
  lastLoginAt: Date;
}
```

### 6.2 활동 (Activity)

```typescript
interface Activity {
  id: string;
  organizationId: string;
  
  // 기본 정보
  title: string;
  description: string;
  category: Category;
  tags: string[];
  
  // 일정
  date: Date;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  
  // 장소
  location: {
    address: string;
    detailAddress: string;
    district: string;
    coordinates: [number, number];
  };
  
  // 참여자
  maxParticipants: number;
  currentParticipants: number;
  ageRestriction: {
    min: number;
    max?: number;
  };
  
  // 활동 상세
  difficulty: 'easy' | 'medium' | 'hard';
  requirements: string[];
  preparation: string[];
  notices: string[];
  benefits: string[];
  
  // 미디어
  images: string[];
  thumbnail: string;
  
  // 연락처
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  
  // 통계
  stats: {
    views: number;
    bookmarks: number;
    applications: number;
    avgRating: number;
    reviewCount: number;
  };
  
  // 상태
  status: 'draft' | 'open' | 'full' | 'closed' | 'completed' | 'cancelled';
  
  // 메타
  createdAt: Date;
  updatedAt: Date;
}

type Category = 'environment' | 'education' | 'welfare' | 'culture' | 'animal' | 'disaster' | 'other';
```

### 6.3 단체 (Organization)

```typescript
interface Organization {
  id: string;
  
  // 기본 정보
  name: string;
  description: string;
  category: string;
  logo: string;
  coverImage: string;
  
  // 연락처
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  
  // 주소
  address: {
    full: string;
    district: string;
    coordinates: [number, number];
  };
  
  // 인증
  verified: boolean;
  registrationNumber?: string;  // 고유번호
  
  // SNS
  social: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  
  // 통계
  stats: {
    totalActivities: number;
    totalParticipants: number;
    avgRating: number;
    reviewCount: number;
  };
  
  // 멤버
  members: {
    userId: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: Date;
  }[];
  
  // 메타
  createdAt: Date;
  updatedAt: Date;
}
```

### 6.4 참여 신청 (Participation)

```typescript
interface Participation {
  id: string;
  userId: string;
  activityId: string;
  
  // 상태
  status: 'applied' | 'approved' | 'rejected' | 'attended' | 'absent' | 'cancelled';
  
  // 신청 정보
  message?: string;
  appliedAt: Date;
  
  // 승인/거절
  approvedAt?: Date;
  approvedBy?: string;
  rejectedAt?: Date;
  rejectedBy?: string;
  rejectionReason?: string;
  
  // 출석
  attendanceTime?: Date;
  attendanceMethod?: 'qr' | 'manual';
  
  // 리뷰
  reviewed: boolean;
  reviewId?: string;
  
  // 인증서
  certificateIssued: boolean;
  certificateNumber?: string;
}
```

### 6.5 리뷰 (Review)

```typescript
interface Review {
  id: string;
  userId: string;
  activityId: string;
  organizationId: string;
  
  // 평가
  rating: number;  // 1-5
  comment: string;
  images: string[];
  
  // 세부 평가
  ratings: {
    organization: number;  // 단체 운영
    activity: number;      // 활동 내용
    communication: number; // 소통
  };
  
  // 반응
  helpful: number;
  reported: number;
  
  // 메타
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 7. 목업 데이터 사양

### 7.1 데이터 규모

```typescript
const MOCK_DATA_SIZE = {
  users: 500,
  organizations: 50,
  activities: 200,      // 과거 + 현재 + 미래
  participations: 2000,
  reviews: 800,
  posts: 300,
  groups: 20,
};
```

### 7.2 지역 분포

```typescript
const DISTRICTS = {
  '처인구': {
    weight: 0.3,
    subdistricts: ['포곡읍', '모현읍', '원삼면', '백암면', '양지면', '남사읍'],
  },
  '기흥구': {
    weight: 0.4,
    subdistricts: ['기흥동', '신갈동', '구갈동', '보라동', '영덕동', '상갈동'],
  },
  '수지구': {
    weight: 0.3,
    subdistricts: ['풍덕천동', '신봉동', '죽전동', '동천동', '상현동'],
  },
};
```

### 7.3 카테고리 분포

```typescript
const CATEGORY_DISTRIBUTION = {
  environment: 0.25,   // 환경
  education: 0.20,     // 교육
  welfare: 0.20,       // 복지
  culture: 0.15,       // 문화
  animal: 0.10,        // 동물
  disaster: 0.05,      // 재난
  other: 0.05,         // 기타
};
```

### 7.4 실제 단체명 예시 (목업)

```typescript
const MOCK_ORGANIZATIONS = [
  {
    name: '용인 그린라이프',
    category: 'environment',
    description: '지속가능한 환경을 위한 시민단체',
  },
  {
    name: '수지 교육봉사회',
    category: 'education',
    description: '취약계층 아동 교육 지원',
  },
  {
    name: '기흥 나눔의 집',
    category: 'welfare',
    description: '독거노인 생활 지원 및 복지',
  },
  {
    name: '용인 문화예술연대',
    category: 'culture',
    description: '지역 문화 활성화와 예술 교육',
  },
  {
    name: '처인 반려동물 보호센터',
    category: 'animal',
    description: '유기동물 구조 및 입양',
  },
  // ... 45개 더
];
```

### 7.5 활동명 예시

```typescript
const MOCK_ACTIVITY_TITLES = {
  environment: [
    '탄천 정화 활동',
    '기흥호수공원 쓰레기 줍기',
    '재활용품 분리수거 교육',
    '도시 텃밭 가꾸기',
    '에너지 절약 캠페인',
  ],
  education: [
    '초등학생 방과후 학습 지도',
    '다문화 가정 아동 한글 교육',
    '진로 멘토링',
    '코딩 교육 봉사',
    '도서관 독서 프로그램',
  ],
  welfare: [
    '독거노인 밑반찬 배달',
    '장애인 이동 지원',
    '무료 급식소 봉사',
    '취약계층 주거환경 개선',
    '사회복지관 행사 지원',
  ],
  // ...
};
```

### 7.6 사용자 페르소나 데이터

```typescript
const PERSONA_TEMPLATES = [
  {
    ageGroup: '20-29',
    interests: ['environment', 'culture'],
    activityLevel: 'high',
    preferredTime: ['weekend', 'evening'],
  },
  {
    ageGroup: '30-39',
    interests: ['education', 'welfare'],
    activityLevel: 'medium',
    preferredTime: ['weekend', 'morning'],
  },
  {
    ageGroup: '40-49',
    interests: ['welfare', 'environment'],
    activityLevel: 'medium',
    preferredTime: ['weekend', 'afternoon'],
  },
  // ...
];
```

### 7.7 리뷰 텍스트 템플릿

```typescript
const REVIEW_TEMPLATES = {
  positive: [
    '정말 의미있는 시간이었습니다. {organization} 덕분에 좋은 경험을 했어요!',
    '활동이 잘 준비되어 있고 담당자분도 친절하셨습니다.',
    '{activity} 활동을 통해 많은 것을 배웠습니다. 추천합니다!',
    '처음 참여했는데 분위기도 좋고 보람찼어요.',
  ],
  neutral: [
    '전반적으로 괜찮았습니다.',
    '다음에 또 참여하고 싶네요.',
    '시간 가는 줄 몰랐습니다.',
  ],
  constructive: [
    '활동은 좋았는데 준비물 안내가 조금 더 명확했으면 좋겠어요.',
    '첫 참여자를 위한 오리엔테이션이 있었으면 합니다.',
    '날씨가 더워서 힘들었지만 보람있었습니다.',
  ],
};
```

---

## 8. UI/UX 요구사항

### 8.1 디자인 시스템

#### 컬러 팔레트
```typescript
const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',  // Main brand color
    600: '#0284c7',
    700: '#0369a1',
  },
  secondary: {
    500: '#8b5cf6',
    600: '#7c3aed',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    500: '#737373',
    700: '#404040',
    900: '#171717',
  },
};
```

#### 타이포그래피
```typescript
const typography = {
  fontFamily: {
    sans: ['Pretendard', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
};
```

#### 간격 시스템
```typescript
const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};
```

### 8.2 컴포넌트 라이브러리

**사용할 shadcn/ui 컴포넌트**:
- Button
- Card
- Badge
- Avatar
- Dialog (Modal)
- Dropdown Menu
- Select
- Input
- Textarea
- Calendar
- Tabs
- Toast
- Progress
- Skeleton
- Separator
- Sheet (Drawer)
- Slider
- Switch
- Table
- Tooltip

### 8.3 반응형 브레이크포인트

```typescript
const breakpoints = {
  sm: '640px',   // Mobile
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large Desktop
  '2xl': '1536px', // Extra Large
};
```

### 8.4 애니메이션

```typescript
const animations = {
  // 페이드 인
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  // 슬라이드 업
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4 },
  },
  // 스케일
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3 },
  },
};
```

### 8.5 접근성 (A11y)

- **WCAG 2.1 Level AA** 준수
- 키보드 네비게이션 지원
- ARIA 속성 적절히 사용
- 색상 대비비 4.5:1 이상
- 포커스 인디케이터 명확
- 스크린 리더 호환

---

## 9. 개발 단계

### Phase 1: 기본 구조 (1-2일)
- [ ] Next.js 프로젝트 초기 설정
- [ ] Tailwind CSS + shadcn/ui 설정
- [ ] 폴더 구조 및 라우팅 설정
- [ ] 레이아웃 컴포넌트 (Header, Footer, Sidebar)
- [ ] 기본 페이지 생성

### Phase 2: 목업 데이터 생성 (1일)
- [ ] 데이터 생성 스크립트 작성
- [ ] 사용자 데이터 (500명)
- [ ] 단체 데이터 (50개)
- [ ] 활동 데이터 (200개)
- [ ] 참여/리뷰 데이터
- [ ] Mock API 구현

### Phase 3: 시민 기능 (2-3일)
- [ ] 메인 페이지
  - [ ] 히어로 섹션
  - [ ] AI 추천 활동
  - [ ] 통계 섹션
- [ ] 활동 찾기 페이지
  - [ ] 활동 목록
  - [ ] 필터/검색
  - [ ] 지도 뷰
- [ ] 활동 상세 페이지
  - [ ] 정보 표시
  - [ ] 신청하기
  - [ ] 리뷰
- [ ] 마이 페이지
  - [ ] 대시보드
  - [ ] 내 활동
  - [ ] 활동 이력

### Phase 4: 단체 기능 (2일)
- [ ] 단체 대시보드
- [ ] 활동 등록/수정
- [ ] 활동 관리
- [ ] 참여자 관리
- [ ] 통계 보기

### Phase 5: 커뮤니티 & 통계 (1-2일)
- [ ] 커뮤니티 피드
- [ ] 소모임
- [ ] 전체 통계 페이지
- [ ] 시민력 지수 대시보드

### Phase 6: AI 매칭 알고리즘 (1일)
- [ ] 매칭 점수 계산
- [ ] 추천 로직 구현
- [ ] 개인화 알고리즘

### Phase 7: 폴리싱 (1-2일)
- [ ] 반응형 디자인 최적화
- [ ] 로딩 상태 처리
- [ ] 에러 핸들링
- [ ] 애니메이션 추가
- [ ] 성능 최적화
- [ ] SEO 최적화

### Phase 8: 배포 (0.5일)
- [ ] Vercel 배포
- [ ] 환경 변수 설정
- [ ] 도메인 연결 (선택)

**총 예상 기간**: 10-14일

---

## 10. 비기능적 요구사항

### 10.1 성능
- 초기 로딩 시간 < 3초
- Lighthouse Score > 90
- 이미지 최적화 (Next.js Image)
- 코드 스플리팅
- 지연 로딩

### 10.2 SEO
- 메타 태그 최적화
- Open Graph 태그
- JSON-LD 구조화 데이터
- sitemap.xml
- robots.txt

### 10.3 보안
- HTTPS 적용
- XSS 방지
- CSRF 토큰
- 입력 검증
- 환경 변수 보호

### 10.4 모니터링
- Vercel Analytics
- Google Analytics (선택)
- Error Tracking (Sentry 등, 선택)

---

## 11. 폴더 구조

```
civic-power-platform/
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   └── default-avatar.png
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── activities/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── my/
│   │   │   ├── page.tsx
│   │   │   ├── activities/page.tsx
│   │   │   ├── history/page.tsx
│   │   │   └── settings/page.tsx
│   │   │
│   │   ├── organization/
│   │   │   ├── page.tsx
│   │   │   ├── activities/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── edit/page.tsx
│   │   │   ├── participants/page.tsx
│   │   │   └── stats/page.tsx
│   │   │
│   │   ├── community/
│   │   │   ├── page.tsx
│   │   │   ├── groups/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   └── posts/[id]/page.tsx
│   │   │
│   │   ├── stats/
│   │   │   └── page.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   │
│   │   └── api/
│   │       ├── activities/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── users/route.ts
│   │       ├── organizations/route.ts
│   │       └── recommendations/route.ts
│   │
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   ├── activities/
│   │   │   ├── ActivityCard.tsx
│   │   │   ├── ActivityGrid.tsx
│   │   │   ├── ActivityFilter.tsx
│   │   │   ├── ActivityMap.tsx
│   │   │   └── ActivityDetail.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── StatsCard.tsx
│   │   │   ├── ChartCard.tsx
│   │   │   └── RecentActivities.tsx
│   │   │
│   │   ├── community/
│   │   │   ├── PostCard.tsx
│   │   │   ├── CommentList.tsx
│   │   │   └── GroupCard.tsx
│   │   │
│   │   └── common/
│   │       ├── LoadingSpinner.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── SearchBar.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── api.ts
│   │   ├── matching-algorithm.ts
│   │   └── mock-data/
│   │       ├── generator.ts
│   │       ├── users.ts
│   │       ├── activities.ts
│   │       ├── organizations.ts
│   │       └── reviews.ts
│   │
│   ├── store/
│   │   ├── useAuthStore.ts
│   │   ├── useActivityStore.ts
│   │   └── useUIStore.ts
│   │
│   ├── types/
│   │   ├── user.ts
│   │   ├── activity.ts
│   │   ├── organization.ts
│   │   └── index.ts
│   │
│   └── hooks/
│       ├── useActivities.ts
│       ├── useRecommendations.ts
│       └── useUser.ts
│
├── .env.local
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 12. 핵심 화면 목록 및 우선순위

### 필수 (Must Have)
1. ✅ 메인 페이지 - AI 추천 포함
2. ✅ 활동 목록 페이지 - 필터/검색
3. ✅ 활동 상세 페이지 - 신청 기능
4. ✅ 마이 페이지 - 대시보드
5. ✅ 단체 대시보드 - 통계
6. ✅ 활동 등록 페이지
7. ✅ 전체 통계 페이지

### 중요 (Should Have)
8. 🔶 활동 지도 뷰
9. 🔶 커뮤니티 피드
10. 🔶 참여자 관리
11. 🔶 활동 이력

### 선택 (Nice to Have)
12. ⭐ 소모임
13. ⭐ 상세 분석 대시보드
14. ⭐ 인증서 발급

---

## 13. API 엔드포인트 명세

### 활동 (Activities)
```
GET    /api/activities              # 활동 목록
GET    /api/activities/:id          # 활동 상세
POST   /api/activities              # 활동 생성
PUT    /api/activities/:id          # 활동 수정
DELETE /api/activities/:id          # 활동 삭제
GET    /api/activities/:id/reviews  # 활동 리뷰 목록
```

### 추천 (Recommendations)
```
GET    /api/recommendations         # AI 추천 활동
POST   /api/recommendations/feedback # 추천 피드백
```

### 사용자 (Users)
```
GET    /api/users/:id               # 사용자 정보
PUT    /api/users/:id               # 사용자 정보 수정
GET    /api/users/:id/activities    # 사용자 활동 목록
GET    /api/users/:id/stats         # 사용자 통계
```

### 단체 (Organizations)
```
GET    /api/organizations           # 단체 목록
GET    /api/organizations/:id       # 단체 상세
GET    /api/organizations/:id/stats # 단체 통계
```

### 참여 (Participations)
```
POST   /api/participations          # 활동 신청
PUT    /api/participations/:id      # 신청 수정/취소
GET    /api/activities/:id/participants # 참여자 목록
```

### 통계 (Statistics)
```
GET    /api/stats/platform          # 플랫폼 전체 통계
GET    /api/stats/civic-index       # 시민력 지수
GET    /api/stats/regional          # 지역별 통계
```

---

## 14. 성공 지표

### 프로토타입 완성도
- [ ] 모든 필수 화면 구현
- [ ] 반응형 디자인 완성
- [ ] 실제 데이터처럼 보이는 목업 데이터
- [ ] 부드러운 애니메이션 및 전환

### 사용자 경험
- [ ] 직관적인 네비게이션
- [ ] 3클릭 이내 주요 기능 접근
- [ ] 명확한 피드백 (로딩, 성공, 에러)
- [ ] 접근성 기준 충족

### 기술적 품질
- [ ] TypeScript 타입 안정성
- [ ] 깨끗한 코드 구조
- [ ] 성능 최적화
- [ ] 버그 없는 동작

---

## 15. 참고 자료

### 디자인 레퍼런스
- https://www.volunteerconnect.org/ (해외 봉사 플랫폼)
- https://www.1365.go.kr/ (국내 자원봉사 포털)
- https://www.meetup.com/ (커뮤니티 플랫폼)

### 기술 문서
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com/
- React Leaflet: https://react-leaflet.js.org/

---

## 16. 다음 단계

1. **PRD 리뷰 및 승인**
2. **개발 환경 설정**
3. **목업 데이터 생성 스크립트 작성**
4. **기본 레이아웃 및 컴포넌트 구현**
5. **페이지별 순차 개발**
6. **테스트 및 QA**
7. **배포 및 데모**

---

**문서 버전**: 1.0.0  
**최종 수정일**: 2025-11-20  
**작성자**: heisenbug0306