# 🔍 시민력 플랫폼 개선사항 종합 분석

작성일: 2025-11-20

## 1. 🐛 기능적 문제점 (높은 우선순위)

### 1.1 작동하지 않는 링크 및 버튼
- **Footer 링크들** (src/components/layout/footer.tsx:43-60)
  - FAQ, 문의하기, 이용약관, 개인정보처리방침 모두 `href="#"` 상태
  - 실제 페이지 생성 필요

- **Header 인증 버튼** (src/components/layout/header.tsx:51-56)
  - 로그인/회원가입 버튼이 UI만 있고 기능 없음
  - onClick 핸들러나 링크 연결 필요

- **활동 상세 페이지** (src/app/activities/[id]/page.tsx)
  - 신청하기 버튼 (line 395): 실제 신청 기능 없음
  - 공유 버튼 (line 410): 공유 기능 없음
  - 저장 버튼 (line 413): 북마크 기능 없음

- **단체 대시보드** (src/app/organization/page.tsx:347-352)
  - 신청 승인/거절 버튼(✓/✕)이 기능 없음
  - 새 활동 만들기 링크 (line 129): 페이지 없음

### 1.2 이미지 처리 문제
- **활동 상세 페이지** (src/app/activities/[id]/page.tsx:164)
  - 카테고리별 기본 이미지 함수가 없음 (activity-card에만 있음)
  - placeholder 이미지가 제대로 작동하지 않을 수 있음

### 1.3 데이터 문제
- **Footer 저작권** (src/components/layout/footer.tsx:77)
  - "© 2024" 하드코딩 → 현재 2025년, 동적으로 변경 필요

## 2. 🎨 디자인 개선사항

### 2.1 반응형 디자인
- **메인 페이지** (src/app/page.tsx:71-88)
  - 프로젝트 상태 grid가 모바일에서 좁을 수 있음
  - 2열 → 1열로 변경 권장

- **대시보드 Stats**
  - 4열 grid가 작은 화면에서 깨질 수 있음
  - md:grid-cols-2 → sm:grid-cols-1 추가 권장

### 2.2 로딩 상태
- **스켈레톤 로더 일관성 부족**
  - 활동 목록: 스켈레톤 O (src/app/activities/page.tsx:104-109)
  - 상세/대시보드: 단순 스피너만 있음
  - 일관된 스켈레톤 컴포넌트 생성 권장

### 2.3 빈 상태(Empty State)
- **디자인 개선 필요**
  - 현재: 단순 텍스트만 있음
  - 권장: 일러스트 + 안내 메시지 + CTA 버튼
  - 영향 받는 컴포넌트:
    - 활동 목록 검색 결과 없음 (activities/page.tsx:164-169)
    - 시민 대시보드 추천 활동 없음 (my/page.tsx:256-261)
    - 단체 대시보드 예정 활동 없음 (organization/page.tsx:297-309)

### 2.4 버튼 일관성
- **asChild prop 사용 불일치**
  - 메인 페이지: asChild 사용 O (수정 완료)
  - Header 로그인 버튼: asChild 사용 X
  - 일관성을 위해 모든 Link+Button 조합에 asChild 적용 권장

### 2.5 색상 시스템
- **하드코딩된 색상들**
  - difficulty colors (activity-card.tsx:35-39): 하드코딩
  - status colors: 여러 곳에 분산
  - → 중앙화된 color theme 시스템 권장

### 2.6 간격(Spacing) 표준화
- **불일치하는 padding 값**
  - 메인 페이지: py-16
  - 다른 페이지들: py-8
  - 표준 값으로 통일 권장

### 2.7 접근성(Accessibility)
- **aria-label 부족**
  - 아이콘만 있는 버튼들 (모바일 메뉴, 공유/저장 버튼)
  - 스크린 리더 지원 부족

- **키보드 네비게이션**
  - 포커스 상태 스타일 미흡
  - Tab 키로 이동 시 현재 위치 파악 어려움

### 2.8 애니메이션
- **부족한 인터랙션**
  - 페이지 전환 애니메이션 없음
  - hover 효과가 activity-card에만 있음
  - 버튼 클릭 피드백 부족

### 2.9 타이포그래피
- **일관성 부족**
  - heading 크기: text-2xl ~ text-5xl 혼재
  - line-height 표준화 필요
  - 텍스트 계층 구조 명확화 필요

### 2.10 카드 그림자
- **활동 카드** (activity-card.tsx:64)
  - `hover:shadow-lg`가 너무 강할 수 있음
  - 더 미묘한 shadow-md 권장

## 3. 🔧 UX 개선사항

### 3.1 에러 처리
- **네트워크 에러 대응 부족**
  ```typescript
  // 현재: console.error만 있음
  catch (error) {
    console.error('Failed to fetch activities:', error)
  }
  ```
  - 사용자에게 에러 표시 필요
  - 재시도 버튼 제공 필요

### 3.2 검색 기능
- **검색 UX 개선**
  - 검색 결과 하이라이팅 없음
  - 자동완성(autocomplete) 없음
  - 검색 히스토리 저장 없음
  - 디바운싱 적용 권장 (타이핑 중 불필요한 API 호출 방지)

### 3.3 필터 UX
- **필터 피드백 부족** (activity-filters.tsx)
  - 필터 적용 시 시각적 변화 부족
  - 적용된 필터 개수 표시 없음
  - 필터 변경 시 결과 개수 미리보기 없음

### 3.4 페이지네이션
- **개선 가능한 점** (activities/page.tsx:119-161)
  - 무한 스크롤 옵션 제공 고려
  - 현재 페이지 강조 개선
  - 페이지 번호 클릭 영역 확대

### 3.5 날짜/시간 표시
- **일관성 및 가독성**
  - 절대 시간만 표시 (예: 2025-11-20)
  - 상대 시간 추가 권장 (예: "3일 후", "2시간 전")
  - date-fns 라이브러리 활용 권장

### 3.6 별점 시스템
- **반 별 지원 부족**
  - 현재: 정수만 지원 (1, 2, 3, 4, 5)
  - 권장: 0.5 단위 지원 (4.5점 등)
  - 별점 크기가 컴포넌트마다 다름 (w-3, w-4, w-5)

### 3.7 대시보드 차트
- **단체 대시보드 월별 추이** (organization/page.tsx:221-243)
  - 현재: 간단한 progress bar
  - 권장: recharts 라이브러리 활용한 실제 차트
  - 더 많은 인사이트 제공 가능

### 3.8 뱃지 시스템
- **불완전한 정보** (my/page.tsx:314-331)
  - 뱃지 획득 조건 표시 없음
  - 잠긴 뱃지(미획득) 표시 없음
  - 진행도 표시 없음 (예: "5개 중 3개 완료")

### 3.9 알림/피드백
- **Toast/Notification 부재**
  - 성공 메시지 없음 (신청 완료, 저장 완료 등)
  - 에러 메시지가 console에만 표시
  - Sonner나 react-hot-toast 도입 권장

### 3.10 성능 최적화
- **이미지 최적화**
  - lazy loading 미적용
  - Next.js Image 컴포넌트 미사용
  - 외부 이미지 최적화 없음

- **데이터 fetching**
  - Prefetching 없음
  - 캐싱 전략 부재
  - React Query 제대로 활용 안 됨

## 4. 📱 모바일 경험

### 4.1 터치 영역
- **작은 터치 타겟**
  - 일부 버튼이 44x44px 미만
  - 모바일에서 클릭하기 어려움

### 4.2 모바일 네비게이션
- **개선 필요** (header.tsx:73-100)
  - 모바일 메뉴가 화면을 가리지 않음
  - 오버레이 배경 없음
  - 메뉴 닫기 UX 개선 필요

## 5. 🚀 우선순위별 작업 계획

### 즉시 수정 (High Priority)
1. ✅ Footer 연도 2024 → 동적으로 변경
2. ✅ 활동 상세 페이지에 getCategoryImage 함수 추가
3. ✅ 로딩 스켈레톤 일관성
4. ✅ 에러 처리 개선
5. ✅ Toast 알림 시스템 추가

### 단기 개선 (Medium Priority)
6. ✅ 검색 디바운싱
7. ✅ 이미지 lazy loading (Next.js Image 컴포넌트)
8. ✅ 반응형 디자인 개선
9. ✅ 접근성 개선 (aria-label)
10. ✅ 애니메이션 추가

### 장기 개선 (Low Priority)
11. 인증 시스템 구현
12. 실제 차트 구현
13. 무한 스크롤
14. 뱃지 시스템 고도화
15. PWA 지원

---

## 작업 이력

### 2025-11-20
- 전체 사이트 분석 완료
- 개선사항 문서 작성

**High Priority 작업 완료:**
- Footer 연도 동적 변경
- 활동 상세 페이지 getCategoryImage 추가
- Skeleton 컴포넌트 생성 및 적용
- react-hot-toast 설치 및 Toast 시스템 구축
- 에러 처리 개선 (사용자 친화적 메시지)

**Medium Priority 작업 완료:**
- 검색 디바운싱 (500ms delay)
- Next.js Image 컴포넌트로 이미지 최적화
- 반응형 grid 개선 (sm:grid-cols-1)
- aria-label 추가 (접근성)
- fade-in 애니메이션 및 transition 추가
