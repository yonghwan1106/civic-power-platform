'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="text-center mb-4">
            <div className="text-6xl mb-4">📡</div>
            <CardTitle className="text-2xl">오프라인 모드</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            인터넷에 연결되어 있지 않습니다.
            <br />
            네트워크 연결을 확인해주세요.
          </p>
          <div className="space-y-2">
            <Button
              onClick={() => window.location.reload()}
              className="w-full"
            >
              다시 시도
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full"
            >
              <Link href="/">
                홈으로 이동
              </Link>
            </Button>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              💡 일부 캐시된 콘텐츠는 오프라인에서도 사용 가능합니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
