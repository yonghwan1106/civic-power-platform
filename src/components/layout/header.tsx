'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Home, Calendar, User, Building2, Info, Users, Award, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleAuthClick = () => {
    toast('🚧 준비 중인 기능입니다', {
      icon: '🔒',
      duration: 2000,
    })
  }

  const navLinks = [
    { href: '/', label: '홈', icon: Home },
    { href: '/about', label: '프로젝트 소개', icon: Info },
    { href: '/activities', label: '활동 찾기', icon: Calendar },
    { href: '/community', label: '커뮤니티', icon: Users },
    { href: '/my', label: '내 활동', icon: User },
    { href: '/certificates', label: '인증서', icon: Award },
    { href: '/reports', label: '보고서', icon: FileText },
    { href: '/organization', label: '단체', icon: Building2 },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                시
              </div>
              <span className="text-xl font-bold">시민력</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleAuthClick}>
              로그인
            </Button>
            <Button size="sm" onClick={handleAuthClick}>
              회원가입
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                )
              })}
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="ghost" size="sm" className="w-full" onClick={handleAuthClick}>
                  로그인
                </Button>
                <Button size="sm" className="w-full" onClick={handleAuthClick}>
                  회원가입
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
