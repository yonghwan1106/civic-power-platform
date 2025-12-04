import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export interface ReportData {
  type: 'personal' | 'organization' | 'platform'
  period: { from: string; to: string }
  generatedAt: string
  summary: {
    totalActivities: number
    totalHours: number
    totalParticipants: number
    totalCertificates: number
    avgRating: number
  }
  categoryDistribution: Array<{ name: string; value: number }>
  monthlyTrend: Array<{ month: string; activities: number; hours: number; participants: number }>
  activities: any[]
  certificates: any[]
}

export interface ReportOptions {
  summary: boolean
  details: boolean
  charts: boolean
  certificates: boolean
}

const reportTypeLabels = {
  personal: '개인 활동 보고서',
  organization: '단체 활동 보고서',
  platform: '플랫폼 통계 보고서',
}

export async function generateReport(data: ReportData, options: ReportOptions): Promise<void> {
  const doc = new jsPDF()

  // Set font for Korean support - using built-in font
  doc.setFont('helvetica')

  let yPos = 20

  // Title
  doc.setFontSize(24)
  doc.setTextColor(14, 165, 233) // Primary color
  doc.text('Civic Power Platform', 105, yPos, { align: 'center' })

  yPos += 15
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0)
  doc.text(reportTypeLabels[data.type], 105, yPos, { align: 'center' })

  // Period
  yPos += 10
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  const fromDate = new Date(data.period.from).toLocaleDateString('ko-KR')
  const toDate = new Date(data.period.to).toLocaleDateString('ko-KR')
  doc.text(`Period: ${fromDate} ~ ${toDate}`, 105, yPos, { align: 'center' })

  // Generated date
  yPos += 5
  const generatedDate = new Date(data.generatedAt).toLocaleDateString('ko-KR')
  doc.text(`Generated: ${generatedDate}`, 105, yPos, { align: 'center' })

  yPos += 15

  // Divider line
  doc.setDrawColor(200, 200, 200)
  doc.line(20, yPos, 190, yPos)

  yPos += 15

  // Summary section
  if (options.summary) {
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('Summary Statistics', 20, yPos)

    yPos += 10

    // Summary boxes
    const summaryData = [
      { label: 'Total Activities', value: data.summary.totalActivities.toString() },
      { label: 'Total Hours', value: `${data.summary.totalHours}h` },
      { label: 'Total Participants', value: data.summary.totalParticipants.toString() },
      { label: 'Certificates Issued', value: data.summary.totalCertificates.toString() },
    ]

    const boxWidth = 40
    const boxHeight = 25
    const startX = 20

    summaryData.forEach((item, index) => {
      const x = startX + index * (boxWidth + 5)

      // Box background
      doc.setFillColor(240, 249, 255)
      doc.roundedRect(x, yPos, boxWidth, boxHeight, 3, 3, 'F')

      // Value
      doc.setFontSize(16)
      doc.setTextColor(14, 165, 233)
      doc.text(item.value, x + boxWidth / 2, yPos + 12, { align: 'center' })

      // Label
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text(item.label, x + boxWidth / 2, yPos + 20, { align: 'center' })
    })

    yPos += boxHeight + 15
  }

  // Category Distribution
  if (options.charts && data.categoryDistribution.length > 0) {
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('Category Distribution', 20, yPos)

    yPos += 10

    const categoryTableData = data.categoryDistribution.map((cat) => [
      cat.name,
      cat.value.toString(),
      `${((cat.value / data.summary.totalActivities) * 100).toFixed(1)}%`,
    ])

    doc.autoTable({
      startY: yPos,
      head: [['Category', 'Count', 'Percentage']],
      body: categoryTableData,
      theme: 'striped',
      headStyles: { fillColor: [14, 165, 233] },
      margin: { left: 20, right: 20 },
    })

    yPos = (doc as any).lastAutoTable.finalY + 15
  }

  // Monthly Trend
  if (options.charts && data.monthlyTrend.length > 0) {
    // Check if we need a new page
    if (yPos > 200) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('Monthly Trend', 20, yPos)

    yPos += 10

    const trendTableData = data.monthlyTrend.map((month) => [
      month.month,
      month.activities.toString(),
      `${month.hours}h`,
      month.participants.toString(),
    ])

    doc.autoTable({
      startY: yPos,
      head: [['Month', 'Activities', 'Hours', 'Participants']],
      body: trendTableData,
      theme: 'striped',
      headStyles: { fillColor: [14, 165, 233] },
      margin: { left: 20, right: 20 },
    })

    yPos = (doc as any).lastAutoTable.finalY + 15
  }

  // Activities list
  if (options.details && data.activities.length > 0) {
    // Check if we need a new page
    if (yPos > 200) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('Recent Activities', 20, yPos)

    yPos += 10

    const activitiesTableData = data.activities.slice(0, 10).map((activity) => [
      activity.title.substring(0, 30) + (activity.title.length > 30 ? '...' : ''),
      new Date(activity.date).toLocaleDateString('ko-KR'),
      activity.currentParticipants.toString(),
      activity.avgRating > 0 ? activity.avgRating.toFixed(1) : '-',
    ])

    doc.autoTable({
      startY: yPos,
      head: [['Activity', 'Date', 'Participants', 'Rating']],
      body: activitiesTableData,
      theme: 'striped',
      headStyles: { fillColor: [14, 165, 233] },
      margin: { left: 20, right: 20 },
      columnStyles: {
        0: { cellWidth: 80 },
      },
    })

    yPos = (doc as any).lastAutoTable.finalY + 15
  }

  // Certificates list
  if (options.certificates && data.certificates.length > 0) {
    // Check if we need a new page
    if (yPos > 200) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('Issued Certificates', 20, yPos)

    yPos += 10

    const certificatesTableData = data.certificates.slice(0, 10).map((cert) => [
      cert.certificateNumber,
      cert.activityTitle.substring(0, 25) + (cert.activityTitle.length > 25 ? '...' : ''),
      `${cert.hours}h`,
      new Date(cert.issuedAt).toLocaleDateString('ko-KR'),
    ])

    doc.autoTable({
      startY: yPos,
      head: [['Certificate No.', 'Activity', 'Hours', 'Issued Date']],
      body: certificatesTableData,
      theme: 'striped',
      headStyles: { fillColor: [14, 165, 233] },
      margin: { left: 20, right: 20 },
    })
  }

  // Footer on all pages
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `Civic Power Platform - Page ${i} of ${pageCount}`,
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    )
    doc.text(
      'Generated with AI-powered Civic Power Platform',
      105,
      doc.internal.pageSize.height - 5,
      { align: 'center' }
    )
  }

  // Save the PDF
  const fileName = `civic-power-report-${data.type}-${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

// Generate certificate PDF
export async function generateCertificatePDF(certificate: {
  certificateNumber: string
  userName: string
  activityTitle: string
  activityDate: string
  organizationName: string
  hours: number
  issuedAt: string
}): Promise<void> {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height

  // Border
  doc.setDrawColor(14, 165, 233)
  doc.setLineWidth(2)
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20)

  // Inner border
  doc.setLineWidth(0.5)
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30)

  // Title
  doc.setFontSize(36)
  doc.setTextColor(14, 165, 233)
  doc.text('Certificate of Volunteer Service', pageWidth / 2, 45, { align: 'center' })

  // Korean title
  doc.setFontSize(20)
  doc.setTextColor(100, 100, 100)
  doc.text('Volunteer Activity Certificate', pageWidth / 2, 55, { align: 'center' })

  // Name
  doc.setFontSize(28)
  doc.setTextColor(0, 0, 0)
  doc.text(certificate.userName, pageWidth / 2, 85, { align: 'center' })

  // Line under name
  doc.setDrawColor(200, 200, 200)
  doc.line(pageWidth / 2 - 50, 90, pageWidth / 2 + 50, 90)

  // Certificate text
  doc.setFontSize(12)
  doc.setTextColor(60, 60, 60)
  doc.text(
    'This is to certify that the above-named person has successfully',
    pageWidth / 2,
    105,
    { align: 'center' }
  )
  doc.text(
    'completed the following volunteer activity:',
    pageWidth / 2,
    112,
    { align: 'center' }
  )

  // Activity details
  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text(`Activity: ${certificate.activityTitle}`, pageWidth / 2, 130, { align: 'center' })
  doc.text(`Organization: ${certificate.organizationName}`, pageWidth / 2, 140, { align: 'center' })
  doc.text(
    `Date: ${new Date(certificate.activityDate).toLocaleDateString('ko-KR')}`,
    pageWidth / 2,
    150,
    { align: 'center' }
  )
  doc.text(`Hours: ${certificate.hours} hours`, pageWidth / 2, 160, { align: 'center' })

  // Certificate number
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Certificate No: ${certificate.certificateNumber}`, 25, pageHeight - 25)

  // Issue date
  doc.text(
    `Issued: ${new Date(certificate.issuedAt).toLocaleDateString('ko-KR')}`,
    pageWidth - 25,
    pageHeight - 25,
    { align: 'right' }
  )

  // Platform name
  doc.setFontSize(14)
  doc.setTextColor(14, 165, 233)
  doc.text('Civic Power Platform', pageWidth / 2, pageHeight - 30, { align: 'center' })

  // Save
  const fileName = `certificate-${certificate.certificateNumber}.pdf`
  doc.save(fileName)
}
