export * from './generators'
export * from './generate'

// Singleton instance of mock data
let mockDataCache: ReturnType<typeof import('./generate').generateAllMockData> | null = null

export function getMockData() {
  if (!mockDataCache) {
    const { generateAllMockData } = require('./generate')
    mockDataCache = generateAllMockData()
  }
  return mockDataCache!
}

// Helper function to reset mock data (useful for testing)
export function resetMockData() {
  mockDataCache = null
}
