'use client'

import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import type { Category, District, Difficulty } from '@/types'

interface ActivityFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  categories: Category[]
  onCategoriesChange: (value: Category[]) => void
  districts: District[]
  onDistrictsChange: (value: District[]) => void
  difficulty?: Difficulty
  onDifficultyChange: (value: Difficulty | undefined) => void
  onReset: () => void
}

const categoryOptions: { value: Category; label: string }[] = [
  { value: 'environment', label: '환경' },
  { value: 'education', label: '교육' },
  { value: 'welfare', label: '복지' },
  { value: 'culture', label: '문화' },
  { value: 'animal', label: '동물' },
  { value: 'disaster', label: '재난/안전' },
  { value: 'other', label: '기타' },
]

const districtOptions: { value: District; label: string }[] = [
  { value: '처인구', label: '처인구' },
  { value: '기흥구', label: '기흥구' },
  { value: '수지구', label: '수지구' },
]

const difficultyOptions: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: '쉬움' },
  { value: 'medium', label: '보통' },
  { value: 'hard', label: '어려움' },
]

export function ActivityFilters({
  search,
  onSearchChange,
  categories,
  onCategoriesChange,
  districts,
  onDistrictsChange,
  difficulty,
  onDifficultyChange,
  onReset,
}: ActivityFiltersProps) {
  const hasFilters = search || categories.length > 0 || districts.length > 0 || difficulty

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="활동 검색..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category */}
        <div>
          <label className="text-sm font-medium mb-2 block">카테고리</label>
          <Select
            value={categories[0] || ''}
            onChange={(e) => {
              if (e.target.value) {
                onCategoriesChange([e.target.value as Category])
              } else {
                onCategoriesChange([])
              }
            }}
          >
            <option value="">전체</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* District */}
        <div>
          <label className="text-sm font-medium mb-2 block">지역</label>
          <Select
            value={districts[0] || ''}
            onChange={(e) => {
              if (e.target.value) {
                onDistrictsChange([e.target.value as District])
              } else {
                onDistrictsChange([])
              }
            }}
          >
            <option value="">전체</option>
            {districtOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-sm font-medium mb-2 block">난이도</label>
          <Select
            value={difficulty || ''}
            onChange={(e) => {
              if (e.target.value) {
                onDifficultyChange(e.target.value as Difficulty)
              } else {
                onDifficultyChange(undefined)
              }
            }}
          >
            <option value="">전체</option>
            {difficultyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          {hasFilters && (
            <Button
              variant="outline"
              onClick={onReset}
              className="w-full"
            >
              <X className="w-4 h-4 mr-2" />
              초기화
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
