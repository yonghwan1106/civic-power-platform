import type {
  Category,
  Difficulty,
  District,
  OrganizationType,
  Coordinates,
  Address,
} from '@/types'

// ==================== Random Helpers ====================

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomItem<T>(array: T[]): T {
  return array[randomInt(0, array.length - 1)]
}

export function randomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, array.length))
}

export function randomBoolean(probability: number = 0.5): boolean {
  return Math.random() < probability
}

export function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function formatTime(hours: number, minutes: number = 0): string {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 9)
  return `${prefix}${timestamp}${random}`
}

// ==================== Korean Data ====================

const koreanLastNames = [
  '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임',
  '한', '오', '서', '신', '권', '황', '안', '송', '전', '홍',
  '유', '고', '문', '양', '손', '배', '백', '허', '남', '심',
]

const koreanFirstNames = [
  // 2음절 이름
  '민준', '서준', '도윤', '예준', '시우', '주원', '하준', '지호', '지우', '준서',
  '서현', '민서', '지유', '서윤', '지우', '하은', '윤서', '지민', '채원', '수아',
  '지훈', '성민', '현우', '재현', '승우', '정우', '민수', '영수', '철수', '영희',
  '민지', '수정', '지혜', '현정', '미영', '수진', '은지', '혜진', '정은', '유진',
  // 1음절 이름
  '준', '민', '현', '우', '진', '윤', '혁', '영', '정', '은',
]

export function generateKoreanName(): string {
  const lastName = randomItem(koreanLastNames)
  const firstName = randomItem(koreanFirstNames)
  return `${lastName}${firstName}`
}

// ==================== 용인시 지역 데이터 ====================

const yonginDistricts: District[] = ['처인구', '기흥구', '수지구']

// 각 구의 실제 동 이름들
const districtLocations = {
  처인구: [
    '김량장동', '남동', '마평동', '삼가동', '역북동', '유방동',
    '포곡읍', '모현읍', '이동읍', '백암면', '양지면', '원삼면',
  ],
  기흥구: [
    '구갈동', '기흥동', '보라동', '상갈동', '신갈동', '영덕동',
    '중동', '하갈동', '동백동', '서천동', '언남동', '보정동',
  ],
  수지구: [
    '고기동', '동천동', '상현동', '성복동', '신봉동', '죽전동',
    '풍덕천동', '대지동',
  ],
}

// 용인시 중심 좌표
const yonginCenter = { lat: 37.2410, lng: 127.1775 }

export function generateYonginAddress(): Address {
  const district = randomItem(yonginDistricts)
  const location = randomItem(districtLocations[district])
  const buildingNumber = randomInt(1, 999)

  // 해당 구역의 실제 좌표 범위
  const districtCoords = {
    처인구: { latOffset: 0.05, lngOffset: 0.05 },
    기흥구: { latOffset: -0.02, lngOffset: -0.03 },
    수지구: { latOffset: -0.05, lngOffset: 0.02 },
  }

  const offset = districtCoords[district]
  const coordinates: Coordinates = {
    lat: yonginCenter.lat + offset.latOffset + randomFloat(-0.02, 0.02),
    lng: yonginCenter.lng + offset.lngOffset + randomFloat(-0.02, 0.02),
  }

  return {
    full: `경기도 용인시 ${district} ${location} ${buildingNumber}`,
    district,
    coordinates,
  }
}

export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371 // Earth radius in km
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180
  const dLon = (coord2.lng - coord1.lng) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// ==================== Email & Phone ====================

export function generateEmail(name: string): string {
  const domains = ['gmail.com', 'naver.com', 'kakao.com', 'daum.net', 'hanmail.net']
  const sanitized = name.replace(/\s/g, '').toLowerCase()
  const num = randomInt(100, 999)
  return `${sanitized}${num}@${randomItem(domains)}`
}

export function generatePhone(): string {
  const prefixes = ['010', '011', '016', '017', '019']
  const middle = randomInt(1000, 9999)
  const last = randomInt(1000, 9999)
  return `${randomItem(prefixes)}-${middle}-${last}`
}

// ==================== Activity Data ====================

const activityTitlesByCategory: Record<Category, string[]> = {
  environment: [
    '탄천 정화 활동',
    '공원 나무 심기',
    '재활용품 분리수거 캠페인',
    '환경보호 캠페인',
    '쓰레기 줍기 플로깅',
    '친환경 텃밭 가꾸기',
    '숲 가꾸기 봉사',
    '하천 정화 활동',
  ],
  education: [
    '초등학생 학습 지도',
    '다문화 가정 아이들 멘토링',
    '디지털 리터러시 교육',
    '어린이 독서 지도',
    '청소년 진로 상담',
    '한글 교육 봉사',
    '영어 회화 봉사',
    '코딩 교육 봉사',
  ],
  welfare: [
    '독거노인 말벗 되기',
    '장애인 이동 지원',
    '무료 급식 봉사',
    '요양원 방문',
    '복지관 행사 지원',
    '노인 IT 교육',
    '아동센터 돌봄',
    '저소득층 반찬 배달',
  ],
  culture: [
    '지역 축제 운영 보조',
    '문화재 해설사',
    '공연 기획 지원',
    '전통문화 체험 진행',
    '도서관 행사 지원',
    '마을 벽화 그리기',
    '어린이 미술 교실',
    '음악회 자원봉사',
  ],
  animal: [
    '유기동물 돌보기',
    '동물보호소 청소',
    '반려동물 산책 봉사',
    '길고양이 급식소 관리',
    '동물 입양 행사 지원',
    '야생동물 서식지 보호',
  ],
  disaster: [
    '응급처치 교육',
    '재난 대비 훈련',
    '안전지킴이',
    '어린이 교통안전 캠페인',
    '소방 안전 교육',
    '재해 복구 지원',
  ],
  other: [
    '마을 공동체 활동',
    '지역 상권 활성화',
    '헌혈 캠페인',
    '기부 물품 정리',
    '행사 진행 보조',
  ],
}

export function generateActivityTitle(category: Category): string {
  return randomItem(activityTitlesByCategory[category])
}

export function generateActivityDescription(title: string, category: Category): string {
  const descriptions = [
    `${title} 활동에 함께하실 분을 모집합니다. 용인시 지역 주민들과 함께 의미있는 시간을 보낼 수 있습니다.`,
    `따뜻한 마음으로 ${title}에 참여해주세요. 여러분의 작은 관심이 큰 변화를 만듭니다.`,
    `${title} 봉사활동을 진행합니다. 특별한 경험이 없어도 괜찮습니다. 성실히 참여해주시면 됩니다.`,
    `용인시에서 ${title}을(를) 실시합니다. 지역사회에 기여하는 소중한 경험을 하실 수 있습니다.`,
    `${title} 자원봉사자를 모집합니다. 봉사활동 후 봉사시간 인증서가 발급됩니다.`,
  ]

  return randomItem(descriptions)
}

const organizationNames: Record<OrganizationType, string[]> = {
  npo: [
    '용인환경보전협회',
    '용인자원봉사센터',
    '희망나눔봉사단',
    '사랑의열매',
    '푸른용인시민모임',
    '용인교육봉사회',
    '나눔과행복',
    '용인복지재단',
  ],
  'social-enterprise': [
    '함께하는세상',
    '용인사회적협동조합',
    '착한기업',
    '더나은미래',
    '용인소셜벤처',
  ],
  cooperative: [
    '용인생활협동조합',
    '주민자치협동조합',
    '마을공동체협동조합',
  ],
  'volunteer-center': [
    '용인시자원봉사센터',
    '처인구자원봉사센터',
    '기흥구자원봉사센터',
    '수지구자원봉사센터',
  ],
  government: [
    '용인시청',
    '용인시 보건소',
    '용인문화재단',
    '용인도시공사',
  ],
}

export function generateOrganizationName(type: OrganizationType): string {
  return randomItem(organizationNames[type])
}

// ==================== Arrays for random selection ====================

export const categories: Category[] = [
  'environment',
  'education',
  'welfare',
  'culture',
  'animal',
  'disaster',
  'other',
]

export const difficulties: Difficulty[] = ['easy', 'medium', 'hard']

export const districts: District[] = yonginDistricts

export const organizationTypes: OrganizationType[] = [
  'npo',
  'social-enterprise',
  'cooperative',
  'volunteer-center',
  'government',
]

export const badgeData = [
  { id: 'seedling', name: '새싹', icon: '🌱', description: '첫 활동 완료' },
  { id: 'sprout', name: '새순', icon: '🌿', description: '5개 활동 완료' },
  { id: 'tree', name: '나무', icon: '🌳', description: '20개 활동 완료' },
  { id: 'action-hero', name: '액션 히어로', icon: '🏃', description: '3회 연속 참여' },
  { id: 'passionate', name: '열정', icon: '❤️', description: '한 달에 10시간 이상' },
  { id: 'influencer', name: '인플루언서', icon: '🌟', description: '10개 리뷰 작성' },
  { id: 'expert', name: '전문가', icon: '🎯', description: '한 카테고리에서 10회 참여' },
  { id: 'explorer', name: '탐험가', icon: '🌍', description: '5개 이상 장소에서 활동' },
]

export const activityRequirements = [
  '편한 복장',
  '운동화 착용',
  '개인 물통',
  '필기도구',
  '마스크 착용',
  '자원봉사 동의서',
]

export const activityPreparation = [
  '간단한 간식 제공',
  '자원봉사 인증서 발급',
  '교통비 지원',
  '식사 제공',
  '봉사활동 확인서',
]

export const reviewComments = [
  '정말 보람찬 활동이었습니다. 다음에도 참여하고 싶어요!',
  '좋은 사람들과 함께해서 즐거웠습니다.',
  '생각보다 어렵지 않았고, 의미있는 시간이었습니다.',
  '단체 관계자분들이 친절하셨습니다. 감사합니다.',
  '지역사회에 기여할 수 있어서 뿌듯했어요.',
  '처음엔 걱정했는데 생각보다 재미있었습니다.',
  '다른 봉사자분들도 모두 열정적이셔서 좋았습니다.',
  '아이들과 함께해서 더 의미있는 시간이었습니다.',
  '준비가 잘 되어있어서 편하게 활동할 수 있었어요.',
  '다음에 친구들도 데려오고 싶습니다!',
]

export const postContents = [
  '오늘 봉사활동 정말 보람찼어요! 다들 수고하셨습니다 👏',
  '처음 참여했는데 생각보다 너무 좋았습니다. 추천해요!',
  '좋은 사람들과 함께해서 행복한 하루였습니다 ✨',
  '용인시에서 이런 활동을 한다니 정말 뜻깊네요.',
  '다음 주에도 참여 예정입니다. 같이 하실 분~?',
  '오늘 활동 사진 공유합니다! 모두 즐거운 시간 되셨죠? 📸',
  '벌써 5번째 참여인데 매번 새로운 느낌이에요.',
  '힘들었지만 그만큼 보람찼습니다 💪',
]
