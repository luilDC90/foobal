import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameType } from '../types/games'

const STORAGE_KEY = 'foobal_games_data'

interface GameProgress {
  [gameId: string]: {
    completed: boolean
    score?: number
    date?: string
  }
}

export const useGamesStore = defineStore('games', () => {
  // State
  const currentGame = ref<GameType | null>(null)
  const gamesProgress = ref<GameProgress>({})
  const todayGames = ref<GameType[]>([])

  // Computed
  const completedGamesToday = computed(() => {
    const today = new Date().toDateString()
    return Object.entries(gamesProgress.value).filter(([gameId, progress]) => {
      return progress.completed && progress.date === today
    }).length
  })

  const totalGamesAvailable = computed(() => {
    return todayGames.value.length
  })

  const allGamesCompleted = computed(() => {
    return completedGamesToday.value === totalGamesAvailable.value
  })

  // Actions
  function loadProgress(): void {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      gamesProgress.value = parsed.progress || {}

      // Resetear progreso si es un nuevo día
      const today = new Date().toDateString()
      const lastDate = parsed.lastDate
      if (lastDate !== today) {
        gamesProgress.value = {}
        saveProgress()
      }
    }
  }

  function saveProgress(): void {
    const data = {
      progress: gamesProgress.value,
      lastDate: new Date().toDateString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  function setCurrentGame(gameType: GameType): void {
    currentGame.value = gameType
  }

  function completeGame(gameType: GameType, score?: number): void {
    gamesProgress.value[gameType] = {
      completed: true,
      score,
      date: new Date().toDateString()
    }
    saveProgress()
  }

  function isGameCompleted(gameType: GameType): boolean {
    const today = new Date().toDateString()
    const progress = gamesProgress.value[gameType]
    return progress?.completed && progress.date === today || false
  }

  function setTodayGames(games: GameType[]): void {
    todayGames.value = games
  }

  function resetProgress(): void {
    gamesProgress.value = {}
    saveProgress()
  }

  // Inicializar
  loadProgress()

  return {
    // State
    currentGame,
    gamesProgress,
    todayGames,
    // Getters
    completedGamesToday,
    totalGamesAvailable,
    allGamesCompleted,
    // Actions
    loadProgress,
    saveProgress,
    setCurrentGame,
    completeGame,
    isGameCompleted,
    setTodayGames,
    resetProgress
  }
})
