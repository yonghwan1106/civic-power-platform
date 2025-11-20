import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Calendar,
  BarChart3,
  Users,
  Building2,
  Activity,
  TrendingUp,
  ArrowRight,
  Search,
  CheckCircle2,
  Sparkles
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto fade-in">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              AI 기반 스마트 매칭 시스템
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                시민력
              </span>
              {" "}플랫폼
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              AI가 추천하는 나에게 꼭 맞는 봉사활동,
              <br />
              <span className="text-foreground font-semibold">용인시 공익활동의 새로운 기준</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8 h-14 group" asChild>
                <Link href="/activities">
                  활동 둘러보기
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14" asChild>
                <Link href="/my">
                  내 대시보드
                </Link>
              </Button>
            </div>

            {/* Quick Search Bar */}
            <div className="pt-8">
              <Link href="/activities" className="block">
                <div className="relative max-w-2xl mx-auto cursor-pointer group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-primary/20 group-hover:border-primary outline-none bg-background/50 backdrop-blur-sm transition-all text-muted-foreground">
                    원하는 봉사활동을 검색해보세요... (예: 환경보호, 교육봉사)
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            왜 시민력 플랫폼인가요?
          </h2>
          <p className="text-lg text-muted-foreground">
            더 스마트하고 효율적인 공익활동 관리
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-2 duration-300 group">
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-2xl">AI 스마트 매칭</CardTitle>
              <CardDescription className="text-base">맞춤형 활동 추천</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                관심사, 위치, 시간대, 난이도를 종합 분석하여
                <span className="text-foreground font-semibold"> 당신에게 최적화된</span> 봉사활동을 추천합니다.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-2 duration-300 group">
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-2xl">올인원 관리</CardTitle>
              <CardDescription className="text-base">간편한 참여 시스템</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                신청, 참여 인증, 시간 기록까지
                <span className="text-foreground font-semibold"> 모든 과정을 한곳에서</span> 편리하게 관리할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-2 duration-300 group">
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-2xl">성과 측정</CardTitle>
              <CardDescription className="text-base">데이터 기반 인사이트</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                활동 성과를 시각화하고
                <span className="text-foreground font-semibold"> 지역사회 영향력을 측정</span>하여 의미 있는 변화를 확인하세요.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              어떻게 시작하나요?
            </h2>
            <p className="text-lg text-muted-foreground">
              3단계로 간편하게 시작하는 봉사활동
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto shadow-lg">
                  1
                </div>
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden md:block">
                  <ArrowRight className="w-8 h-8 text-primary/30" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">활동 탐색</h3>
              <p className="text-muted-foreground">
                AI 추천 또는 검색으로 마음에 드는 활동을 찾아보세요
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto shadow-lg">
                  2
                </div>
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden md:block">
                  <ArrowRight className="w-8 h-8 text-primary/30" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">신청 & 승인</h3>
              <p className="text-muted-foreground">
                간단한 신청으로 활동 참여를 시작하세요
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold">참여 & 인증</h3>
              <p className="text-muted-foreground">
                활동에 참여하고 봉사시간을 자동으로 기록하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            함께 만드는 변화
          </h2>
          <p className="text-lg text-muted-foreground">
            지금까지 시민력 플랫폼과 함께한 숫자들
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">500</p>
              <p className="text-sm text-muted-foreground font-medium">등록 사용자</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">50</p>
              <p className="text-sm text-muted-foreground font-medium">참여 단체</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">200</p>
              <p className="text-sm text-muted-foreground font-medium">진행 활동</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">2,000</p>
              <p className="text-sm text-muted-foreground font-medium">참여 기록</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            지금 바로 시작해보세요
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            AI가 추천하는 나만의 봉사활동을 찾아 지역사회에 기여해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 h-14 group" asChild>
              <Link href="/activities">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                활동 찾아보기
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <Link href="/my">
                내 대시보드로
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
