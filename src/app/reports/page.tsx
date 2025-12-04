'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Award,
  Building2,
  CheckCircle2,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import toast from 'react-hot-toast'
import { generateReport, type ReportData } from '@/lib/report-generator'

type ReportType = 'personal' | 'organization' | 'platform'

const reportTypes = [
  {
    id: 'personal' as ReportType,
    label: '개인 활동 보고서',
    description: '나의 봉사활동 통계 및 성장 기록',
    icon: Users,
  },
  {
    id: 'organization' as ReportType,
    label: '단체 활동 보고서',
    description: '단체의 활동 현황 및 참여자 통계',
    icon: Building2,
  },
  {
    id: 'platform' as ReportType,
    label: '플랫폼 통계 보고서',
    description: '전체 플랫폼 활동 현황 및 시스템 메트릭',
    icon: TrendingUp,
  },
]

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4']

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>('personal')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [includeOptions, setIncludeOptions] = useState({
    summary: true,
    details: true,
    charts: true,
    certificates: true,
  })

  useEffect(() => {
    // Set default date range (last 6 months)
    const today = new Date()
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(today.getMonth() - 6)

    setDateTo(today.toISOString().split('T')[0])
    setDateFrom(sixMonthsAgo.toISOString().split('T')[0])

    fetchReportData()
  }, [])

  useEffect(() => {
    if (dateFrom && dateTo) {
      fetchReportData()
    }
  }, [reportType, dateFrom, dateTo])

  const fetchReportData = async () => {
    setLoading(true)
    try {
      // Fetch mock data for report
      const [activitiesRes, certificatesRes] = await Promise.all([
        fetch('/api/activities?pageSize=100&status=completed'),
        fetch('/api/certificates?pageSize=100'),
      ])

      const activitiesData = await activitiesRes.json()
      const certificatesData = await certificatesRes.json()

      if (activitiesData.success && certificatesData.success) {
        // Generate report statistics
        const activities = activitiesData.data.items
        const certificates = certificatesData.data.items

        // Category distribution
        const categoryCount: Record<string, number> = {}
        activities.forEach((a: any) => {
          categoryCount[a.category] = (categoryCount[a.category] || 0) + 1
        })

        const categoryLabels: Record<string, string> = {
          environment: '환경',
          education: '교육',
          welfare: '복지',
          culture: '문화',
          animal: '동물',
          disaster: '재난/안전',
          other: '기타',
        }

        const categoryData = Object.entries(categoryCount).map(([key, value]) => ({
          name: categoryLabels[key] || key,
          value,
        }))

        // Monthly trend (last 6 months)
        const monthlyTrend = []
        for (let i = 5; i >= 0; i--) {
          const date = new Date()
          date.setMonth(date.getMonth() - i)
          const monthName = date.toLocaleDateString('ko-KR', { month: 'short' })
          monthlyTrend.push({
            month: monthName,
            activities: Math.floor(Math.random() * 20) + 5,
            hours: Math.floor(Math.random() * 100) + 20,
            participants: Math.floor(Math.random() * 200) + 50,
          })
        }

        setReportData({
          type: reportType,
          period: { from: dateFrom, to: dateTo },
          generatedAt: new Date().toISOString(),
          summary: {
            totalActivities: activities.length,
            totalHours: certificatesData.data.stats.totalHours,
            totalParticipants: activities.reduce((sum: number, a: any) => sum + a.currentParticipants, 0),
            totalCertificates: certificatesData.data.stats.totalCertificates,
            avgRating: 4.5,
          },
          categoryDistribution: categoryData,
          monthlyTrend,
          activities: activities.slice(0, 10),
          certificates: certificates.slice(0, 10),
        })
      }
    } catch (error) {
      console.error('Failed to fetch report data:', error)
      toast.error('보고서 데이터를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleGeneratePDF = async () => {
    if (!reportData) return

    setGenerating(true)
    try {
      await generateReport(reportData, includeOptions)
      toast.success('PDF 보고서가 다운로드되었습니다.')
    } catch (error) {
      console.error('Failed to generate PDF:', error)
      toast.error('PDF 생성에 실패했습니다.')
    } finally {
      setGenerating(false)
    }
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
            <FileText className="w-10 h-10 text-primary" />
            활동 보고서
          </h1>
          <p className="text-muted-foreground">
            봉사활동 통계 및 영향도 분석 보고서를 생성하세요
          </p>
        </div>

        {/* Report Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {reportTypes.map((type) => {
            const Icon = type.icon
            return (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all ${
                  reportType === type.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setReportType(type.id)}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{type.label}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Stats */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <Skeleton className="h-8 w-16 mb-2" />
                      <Skeleton className="h-4 w-20" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : reportData ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold">{reportData.summary.totalActivities}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">총 활동</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-green-500" />
                      <span className="text-2xl font-bold">{reportData.summary.totalHours}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">총 시간</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="text-2xl font-bold">{reportData.summary.totalParticipants}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">총 참여자</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-2xl font-bold">{reportData.summary.totalCertificates}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">인증서</p>
                  </CardContent>
                </Card>
              </div>
            ) : null}

            {/* Monthly Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  월별 활동 추이
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : reportData ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reportData.monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#0ea5e9" />
                      <YAxis yAxisId="right" orientation="right" stroke="#22c55e" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="activities" fill="#0ea5e9" name="활동 수" />
                      <Bar yAxisId="right" dataKey="hours" fill="#22c55e" name="봉사 시간" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : null}
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  카테고리별 분포
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : reportData ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={reportData.categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reportData.categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : null}
              </CardContent>
            </Card>

            {/* Recent Activities Table */}
            <Card>
              <CardHeader>
                <CardTitle>최근 활동 내역</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : reportData?.activities ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">활동명</th>
                          <th className="text-left py-2 font-medium">날짜</th>
                          <th className="text-right py-2 font-medium">참여자</th>
                          <th className="text-right py-2 font-medium">평점</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.activities.slice(0, 5).map((activity: any) => (
                          <tr key={activity.id} className="border-b last:border-b-0">
                            <td className="py-2 max-w-[200px] truncate">{activity.title}</td>
                            <td className="py-2 text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString('ko-KR')}
                            </td>
                            <td className="py-2 text-right">{activity.currentParticipants}명</td>
                            <td className="py-2 text-right">
                              {activity.avgRating > 0 ? `⭐ ${activity.avgRating.toFixed(1)}` : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Report Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>보고서 옵션</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">기간 선택</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Include Options */}
                <div>
                  <label className="text-sm font-medium mb-3 block">포함할 항목</label>
                  <div className="space-y-2">
                    {[
                      { key: 'summary', label: '통계 요약' },
                      { key: 'details', label: '상세 데이터' },
                      { key: 'charts', label: '차트' },
                      { key: 'certificates', label: '인증서 목록' },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeOptions[item.key as keyof typeof includeOptions]}
                          onChange={(e) =>
                            setIncludeOptions({
                              ...includeOptions,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="w-4 h-4 rounded border-input"
                        />
                        <span className="text-sm">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleGeneratePDF}
                  disabled={loading || generating || !reportData}
                >
                  {generating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      생성 중...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      PDF 보고서 생성
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Report Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">보고서 정보</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  PDF 형식으로 다운로드됩니다
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  차트와 통계가 포함됩니다
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  인쇄 및 공유가 가능합니다
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
