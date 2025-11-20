import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl font-bold text-primary">
            시민력 플랫폼
          </h1>
          <p className="text-xl text-muted-foreground">
            AI 기반 지역 공익활동 매칭 & 관리 시스템
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>AI 매칭</CardTitle>
              <CardDescription>맞춤형 활동 추천</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                관심사, 위치, 시간대를 분석하여 최적의 봉사활동을 추천합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>활동 관리</CardTitle>
              <CardDescription>간편한 참여 시스템</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                신청부터 참여 인증까지 모든 과정을 한곳에서 관리합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>성과 측정</CardTitle>
              <CardDescription>데이터 기반 인사이트</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                활동 성과를 시각화하고 지역사회 영향력을 측정합니다.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-x-4">
          <Button size="lg">
            활동 둘러보기
          </Button>
          <Button size="lg" variant="outline">
            시작하기
          </Button>
        </div>

        <div className="mt-16 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-bold mb-4">프로젝트 상태</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">500</p>
              <p className="text-sm text-muted-foreground">등록 사용자</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">50</p>
              <p className="text-sm text-muted-foreground">참여 단체</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">200</p>
              <p className="text-sm text-muted-foreground">진행 활동</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">2,000</p>
              <p className="text-sm text-muted-foreground">참여 기록</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
