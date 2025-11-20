import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  Lightbulb,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Brain,
  Calendar,
  BarChart3,
  Shield,
  Sparkles,
  Award,
  Globe,
  Heart
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              ｢제4회 시민 공감大 아이디어 공모전｣ 출품작
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              시민력<span className="text-muted-foreground">(市民力)</span> 플랫폼
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground">
              AI 기반 지역 공익활동 매칭·관리 시스템
            </p>

            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <Badge variant="outline">AI 스마트 매칭</Badge>
              <Badge variant="outline">통합 관리 시스템</Badge>
              <Badge variant="outline">게임화 요소</Badge>
              <Badge variant="outline">데이터 인사이트</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 제안 배경 */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">제안 배경 및 필요성</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 text-xl">!</span>
                  </div>
                  낮은 시민사회 참여율
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-2">
                  <li>• 2024년 한국 자원봉사 참여율: 12% (통계청)</li>
                  <li>• 정보 접근성 부족으로 참여 기회 제한</li>
                  <li>• 활동 정보가 단체별로 분산</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <span className="text-orange-600 dark:text-orange-400 text-xl">!</span>
                  </div>
                  정부-시민사회 소통 단절
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-2">
                  <li>• 시민사회 활동 현황 파악 어려움</li>
                  <li>• 데이터 기반 정책 수립 한계</li>
                  <li>• 투명성 및 신뢰성 확보 과제</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400 text-xl">!</span>
                  </div>
                  단체의 참여자 모집 어려움
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-2">
                  <li>• 홍보 채널 부족 및 비용 부담</li>
                  <li>• 적합한 참여자 발굴 어려움</li>
                  <li>• 참여자 관리 시스템 부재</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">!</span>
                  </div>
                  참여 지속성 문제
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-2">
                  <li>• 일회성 참여에 그치는 경우 많음</li>
                  <li>• 동기 부여 부족</li>
                  <li>• 성과 및 영향력 가시화 미흡</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 솔루션 */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Lightbulb className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">우리의 솔루션</h2>
            </div>

            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    AI 기반 스마트 매칭 플랫폼
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    시민-활동-단체를 연결하여 참여 장벽을 낮추고<br />
                    지속 가능한 공익활동 생태계를 조성합니다
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
                      <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-lg">접근성</h4>
                    <p className="text-sm text-muted-foreground">
                      AI 추천으로<br />누구나 쉽게
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-semibold text-lg">투명성</h4>
                    <p className="text-sm text-muted-foreground">
                      데이터 기반<br />신뢰 구축
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto">
                      <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="font-semibold text-lg">지속성</h4>
                    <p className="text-sm text-muted-foreground">
                      게임화로<br />재미있게 오래
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 주요 기능 */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">주요 기능</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle>AI 스마트 매칭</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>• 관심사, 위치, 시간대 종합 분석</p>
                <p>• 참여 가능성 높은 활동 우선 추천</p>
                <p>• 머신러닝으로 정확도 지속 개선</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle>통합 관리 시스템</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>• 시민/단체 대시보드</p>
                <p>• 신청·승인·인증 자동화</p>
                <p>• 봉사시간 자동 기록</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <CardTitle>게임화 시스템</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>• 10가지 뱃지 시스템</p>
                <p>• 레벨 및 경험치 시스템</p>
                <p>• 연속 참여 스트릭 기록</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle>데이터 인사이트</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>• 월별 활동 추이 차트</p>
                <p>• 카테고리별 분석</p>
                <p>• 정책 수립을 위한 통계</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 기대 효과 */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold">기대 효과</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 정량적 효과 */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    정량적 효과
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">활동 참여율</span>
                      <span className="text-sm font-bold text-green-600">200% ↑</span>
                    </div>
                    <div className="text-xs text-muted-foreground">15% → 45%</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">재참여율</span>
                      <span className="text-sm font-bold text-green-600">250% ↑</span>
                    </div>
                    <div className="text-xs text-muted-foreground">20% → 70%</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">평균 참여 기간</span>
                      <span className="text-sm font-bold text-green-600">400% ↑</span>
                    </div>
                    <div className="text-xs text-muted-foreground">2개월 → 10개월</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">관리 업무 시간</span>
                      <span className="text-sm font-bold text-blue-600">60% ↓</span>
                    </div>
                    <div className="text-xs text-muted-foreground">10시간/주 → 4시간/주</div>
                  </div>
                </CardContent>
              </Card>

              {/* 정성적 효과 */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    정성적 효과
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">시민</div>
                      <div className="text-xs text-muted-foreground">참여 장벽 해소, 만족도 향상</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">단체</div>
                      <div className="text-xs text-muted-foreground">효율적 모집, 데이터 기반 개선</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">정부</div>
                      <div className="text-xs text-muted-foreground">현황 파악, 효과적 정책 수립</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">사회</div>
                      <div className="text-xs text-muted-foreground">공익활동 문화 확산, 공동체 활성화</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 공모전 주제 부합도 */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">공모전 주제 부합도</h2>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                  정부와 시민사회 간 협력 체계 강화
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>• <strong>투명한 데이터 공유</strong>: 모든 활동이 플랫폼에 등록되어 실시간 현황 파악</p>
                <p>• <strong>정책 연계</strong>: 수요 데이터 기반으로 정부 지원 정책 설계</p>
                <p>• <strong>신뢰 구축</strong>: 인증 시스템으로 활동 투명성 확보</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                  시민사회의 자율성·참여성 향상
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>• <strong>AI 맞춤 추천</strong>: 개인 맞춤형 활동 제안으로 선택권 확대</p>
                <p>• <strong>낮은 진입장벽</strong>: 3클릭 신청, 간편 인증</p>
                <p>• <strong>자율적 참여</strong>: 강제 없이 본인이 원하는 활동 선택</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                  공익활동 활성화
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>• <strong>통합 플랫폼</strong>: 500개 단체, 200개 활동 한눈에 확인</p>
                <p>• <strong>게임화</strong>: 뱃지, 레벨, 통계로 동기 부여</p>
                <p>• <strong>영향력 가시화</strong>: 나의 활동이 만든 변화 확인</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</span>
                  국민적 관심을 높일 수 있는 아이디어
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>• <strong>AI 기술</strong>: 최신 기술로 공익활동 혁신</p>
                <p>• <strong>게임화</strong>: 재미 요소로 지속 가능한 참여</p>
                <p>• <strong>소셜 기능</strong>: SNS처럼 후기 공유, 소통</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            모든 시민이 공익활동의 주인공이 되는 세상
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            시민력 플랫폼과 함께 시민사회 참여를 혁신하고<br />
            지속 가능한 공익활동 생태계를 만들어갑니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://civic-power-platform.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 h-12 bg-white text-primary rounded-md font-medium hover:bg-white/90 transition-colors"
            >
              데모 사이트 보기
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a
              href="https://github.com/yonghwan1106/civic-power-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 h-12 border-2 border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              GitHub 보기
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
