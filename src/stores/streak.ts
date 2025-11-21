import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'foobal_streak_data'

interface StreakData {
  streak: number
  lastDate: string | null
}

export const useStreakStore = defineStore('streak', () => {
  // State
  const currentStreak = ref<number>(0)
  const lastCompletedDate = ref<string | null>(null)

  // Computed
  const isTodayCompleted = computed(() => {
    if (!lastCompletedDate.value) return false

    const last = new Date(lastCompletedDate.value)
    const today = new Date()

    return (
      last.getDate() === today.getDate() &&
      last.getMonth() === today.getMonth() &&
      last.getFullYear() === today.getFullYear()
    )
  })

  // Actions
  function loadStreak(): void {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const parsed: StreakData = JSON.parse(data)
      currentStreak.value = parsed.streak || 0
      lastCompletedDate.value = parsed.lastDate || null

      // Verificar si se rompió la racha (más de 1 día sin completar)
      if (lastCompletedDate.value) {
        const last = new Date(lastCompletedDate.value)
        const today = new Date()
        const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))

        // Si pasó más de 1 día, resetear racha
        if (diffDays > 1) {
          currentStreak.value = 0
          saveStreak()
        }
      }
    }
  }

  function saveStreak(): void {
    const data: StreakData = {
      streak: currentStreak.value,
      lastDate: lastCompletedDate.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  function completeToday(): void {
    if (isTodayCompleted.value) return

    const today = new Date()
    const todayStr = today.toISOString()

    // Si es el día siguiente consecutivo, incrementar racha
    if (lastCompletedDate.value) {
      const last = new Date(lastCompletedDate.value)
      const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        currentStreak.value++
      } else {
        // Reiniciar racha si no es consecutivo
        currentStreak.value = 1
      }
    } else {
      // Primera vez
      currentStreak.value = 1
    }

    lastCompletedDate.value = todayStr
    saveStreak()
  }

  // Inicializar al crear el store
  loadStreak()

  return {
    // State
    currentStreak,
    lastCompletedDate,
    // Getters
    isTodayCompleted,
    // Actions
    loadStreak,
    saveStreak,
    completeToday
  }
})
