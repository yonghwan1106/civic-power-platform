'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Award,
  Download,
  Search,
  Clock,
  Calendar,
  Building2,
  FileCheck,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import toast from 'react-hot-toast'
import type { Certificate } from '@/types'

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'latest' | 'oldest' | 'hours'>('latest')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [stats, setStats] = useState({ totalCertificates: 0, totalHours: 0 })
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      fetchCertificates()
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    setPage(1)
    fetchCertificates()
  }, [sort])

  useEffect(() => {
    fetchCertificates()
  }, [page])

  const fetchCertificates = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: '10',
        sort,
      })

      if (search) params.append('search', search)

      const response = await fetch(`/api/certificates?${params}`)
      const result = await response.json()

      if (result.success) {
        setCertificates(result.data.items)
        setTotalPages(result.data.totalPages)
        setStats(result.data.stats)
      } else {
        toast.error('인증서를 불러오는데 실패했습니다.')
      }
    } catch (error) {
      console.error('Failed to fetch certificates:', error)
      toast.error('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (cert: Certificate) => {
    toast.success('인증서 다운로드 기능은 보고서 페이지에서 이용 가능합니다.')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Award className="w-10 h-10 text-primary" />
            봉사 인증서
          </h1>
          <p className="text-muted-foreground">
            활동에 참여하고 발급받은 봉사 인증서를 확인하세요
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">발급된 인증서</p>
                  <p className="text-3xl font-bold">{stats.totalCertificates}건</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">총 봉사 시간</p>
                  <p className="text-3xl font-bold">{stats.totalHours}시간</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="활동명, 단체명, 인증번호 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={sort === 'latest' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSort('latest')}
            >
              최신순
            </Button>
            <Button
              variant={sort === 'oldest' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSort('oldest')}
            >
              오래된순
            </Button>
            <Button
              variant={sort === 'hours' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSort('hours')}
            >
              시간순
            </Button>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Certificate List */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-16 h-16 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : certificates.length > 0 ? (
              certificates.map((cert) => (
                <Card
                  key={cert.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCert?.id === cert.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCert(cert)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Award className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-lg line-clamp-1">
                              {cert.activityTitle}
                            </h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {cert.organizationName}
                            </p>
                          </div>
                          <Badge variant="secondary" className="flex-shrink-0">
                            {cert.hours}시간
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(cert.activityDate)}
                          </span>
                          <span>#{cert.certificateNumber}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-16">
                <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-xl text-muted-foreground mb-2">
                  발급된 인증서가 없습니다
                </p>
                <p className="text-sm text-muted-foreground">
                  봉사활동에 참여하고 인증서를 받아보세요
                </p>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  이전
                </Button>
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= page - 1 && pageNum <= page + 1)
                    ) {
                      return (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? 'default' : 'outline'}
                          onClick={() => setPage(pageNum)}
                          className="w-10"
                        >
                          {pageNum}
                        </Button>
                      )
                    } else if (pageNum === page - 2 || pageNum === page + 2) {
                      return <span key={pageNum}>...</span>
                    }
                    return null
                  })}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  다음
                </Button>
              </div>
            )}
          </div>

          {/* Certificate Detail */}
          <div className="space-y-6">
            {selectedCert ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    인증서 상세
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Certificate Preview */}
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 text-center border">
                    <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h3 className="font-bold text-lg mb-1">봉사활동 인증서</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Certificate of Volunteer Service
                    </p>
                    <p className="font-semibold text-lg">{selectedCert.userName}</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      위 사람은 다음의 봉사활동에 참여하였음을 인증합니다.
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">활동명</span>
                      <span className="font-medium text-right max-w-[60%]">
                        {selectedCert.activityTitle}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">단체명</span>
                      <span className="font-medium">{selectedCert.organizationName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">활동일</span>
                      <span className="font-medium">{formatDate(selectedCert.activityDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">봉사시간</span>
                      <span className="font-medium">{selectedCert.hours}시간</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">인증번호</span>
                      <span className="font-medium font-mono">{selectedCert.certificateNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">발급일</span>
                      <span className="font-medium">{formatDate(selectedCert.issuedAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-4">
                    <Button onClick={() => handleDownload(selectedCert)}>
                      <Download className="w-4 h-4 mr-2" />
                      PDF 다운로드
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/verify/${selectedCert.certificateNumber}`
                        )
                        toast.success('인증 링크가 복사되었습니다.')
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      인증 링크 복사
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground py-8">
                    <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>인증서를 선택하면</p>
                    <p>상세 정보를 볼 수 있습니다</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">인증서 안내</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• 인증서는 활동 완료 후 자동 발급됩니다</p>
                <p>• PDF로 다운로드하여 출력할 수 있습니다</p>
                <p>• 인증 링크로 온라인 확인이 가능합니다</p>
                <p>• 문의사항은 단체에 연락해주세요</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
