<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { argentineTeams, getRandomTeams } from '../data/teams'
import type { TeamBadge } from '../types/games'

interface Emits {
  (e: 'complete', correct: boolean): void
  (e: 'cancel'): void
}

const emit = defineEmits<Emits>()

const currentTeam = ref<TeamBadge | null>(null)
const answered = ref(false)
const isCorrect = ref(false)
const score = ref(0)
const round = ref(1)
const maxRounds = 5

onMounted(() => {
  nextRound()
})

const nextRound = () => {
  const teams = getRandomTeams(1)
  currentTeam.value = teams[0]
  answered.value = false
}

const selectDivision = (division: 'primera' | 'ascenso') => {
  if (answered.value || !currentTeam.value) return

  answered.value = true
  isCorrect.value = currentTeam.value.division === division

  if (isCorrect.value) {
    score.value++
  }

  setTimeout(() => {
    if (round.value < maxRounds) {
      round.value++
      nextRound()
    } else {
      // Fin del juego
      setTimeout(() => {
        emit('complete', score.value >= 3)
      }, 1500)
    }
  }, 1500)
}
</script>

<template>
  <div class="ascenso-overlay" @click.self="$emit('cancel')">
    <div class="ascenso-container">
      <div class="game-header">
        <h2>⬆️ Ascenso o Prófugo</h2>
        <button class="close-btn" @click="$emit('cancel')">✕</button>
      </div>

      <div class="game-content">
        <div class="progress-bar">
          <div class="rounds-info">
            Ronda {{ round }} / {{ maxRounds }} | Aciertos: {{ score }}
          </div>
        </div>

        <div v-if="currentTeam" class="team-display">
          <div class="team-badge">{{ currentTeam.badge }}</div>
          <h3 class="team-name">{{ currentTeam.teamName }}</h3>

          <p class="question">¿En qué categoría juega?</p>

          <div class="options" v-if="!answered">
            <button @click="selectDivision('primera')" class="option-btn primera">
              <span class="icon">🏆</span>
              <span>Primera División</span>
            </button>
            <button @click="selectDivision('ascenso')" class="option-btn ascenso">
              <span class="icon">⬆️</span>
              <span>Ascenso</span>
            </button>
          </div>

          <div v-if="answered" class="result">
            <div v-if="isCorrect" class="correct-message">
              <h3>✓ ¡Correcto!</h3>
              <p>{{ currentTeam.teamName }} juega en {{ currentTeam.division === 'primera' ? 'Primera División' : 'Ascenso' }}</p>
            </div>
            <div v-else class="incorrect-message">
              <h3>✗ Incorrecto</h3>
              <p>{{ currentTeam.teamName }} juega en {{ currentTeam.division === 'primera' ? 'Primera División' : 'Ascenso' }}</p>
            </div>
          </div>
        </div>

        <div v-if="round > maxRounds" class="final-score">
          <h3>¡Juego Terminado!</h3>
          <p class="score-display">{{ score }} / {{ maxRounds }} aciertos</p>
          <p v-if="score >= 4" class="excellent">¡Excelente!</p>
          <p v-else-if="score >= 3" class="good">¡Bien hecho!</p>
          <p v-else class="try-again">Puedes mejorar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ascenso-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.ascenso-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.game-header h2 {
  margin: 0;
  font-size: 1.8rem;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  padding: 0;
  font-size: 1.5rem;
}

.progress-bar {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 30px;
  text-align: center;
}

.rounds-info {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffd700;
}

.team-display {
  text-align: center;
}

.team-badge {
  font-size: 5rem;
  margin-bottom: 15px;
}

.team-name {
  font-size: 2rem;
  margin-bottom: 25px;
  color: #fff;
}

.question {
  font-size: 1.2rem;
  margin-bottom: 25px;
  opacity: 0.95;
}

.options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.option-btn {
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.option-btn:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.5);
}

.option-btn .icon {
  font-size: 2.5rem;
}

.option-btn.primera {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.option-btn.ascenso {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.result {
  margin-top: 20px;
  padding: 20px;
  border-radius: 15px;
}

.correct-message {
  background: rgba(76, 175, 80, 0.3);
  border: 2px solid #4caf50;
}

.correct-message h3 {
  color: #4caf50;
  margin-bottom: 10px;
}

.incorrect-message {
  background: rgba(244, 67, 54, 0.3);
  border: 2px solid #f44336;
}

.incorrect-message h3 {
  color: #f44336;
  margin-bottom: 10px;
}

.final-score {
  text-align: center;
  padding: 30px;
}

.score-display {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffd700;
  margin: 20px 0;
}

.excellent {
  color: #4caf50;
  font-size: 1.3rem;
  font-weight: 600;
}

.good {
  color: #ffeb3b;
  font-size: 1.3rem;
  font-weight: 600;
}

.try-again {
  color: #ff9800;
  font-size: 1.3rem;
  font-weight: 600;
}

@media (max-width: 600px) {
  .options {
    grid-template-columns: 1fr;
  }
}
</style>
