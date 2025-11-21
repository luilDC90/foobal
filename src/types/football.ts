export interface Team {
  id: string
  name: string
  badge?: string
  stadium?: string
}

export interface Player {
  id: string
  name: string
  position?: string
  team?: string
}

export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  date: string
}

export interface Question {
  question: string
  options: string[]
  correct: number
  category: 'general' | 'teams' | 'players' | 'history'
}
