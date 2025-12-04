import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">시민력 플랫폼</h3>
            <p className="text-sm text-muted-foreground">
              AI 기반 지역 공익활동 매칭 & 관리 시스템
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/activities" className="text-muted-foreground hover:text-foreground">
                  활동 찾기
                </Link>
              </li>
              <li>
                <Link href="/my" className="text-muted-foreground hover:text-foreground">
                  내 활동
                </Link>
              </li>
              <li>
                <Link href="/organization" className="text-muted-foreground hover:text-foreground">
                  단체 대시보드
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">지원</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  문의하기
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  개인정보처리방침
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">연락처</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>대한민국</li>
              <li>이메일: info@civicpower.kr</li>
              <li>전화: 031-1234-5678</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 시민력 플랫폼. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
