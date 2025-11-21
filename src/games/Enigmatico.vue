<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getRandomPlayer } from '../data/players'
import type { PlayerCareer } from '../types/games'

interface Emits {
  (e: 'complete', correct: boolean): void
  (e: 'cancel'): void
}

const emit = defineEmits<Emits>()

const player = ref<PlayerCareer | null>(null)
const revealedTeams = ref<number>(0)
const guessInput = ref('')
const gameOver = ref(false)
const won = ref(false)
const hints = ref(0)

const maxTeamsToShow = 12

const teamsToShow = computed(() => {
  if (!player.value) return []
  return player.value.teams.slice(0, Math.min(revealedTeams.value, player.value.teams.length))
})

const canRevealMore = computed(() => {
  return player.value && revealedTeams.value < Math.min(player.value.teams.length, maxTeamsToShow)
})

onMounted(() => {
  player.value = getRandomPlayer()
  revealedTeams.value = 3 // Empezar mostrando 3 equipos
})

const revealMoreTeams = () => {
  if (canRevealMore.value) {
    revealedTeams.value += 2
    hints.value++
  }
}

const submitGuess = () => {
  if (!player.value || !guessInput.value.trim() || gameOver.value) return

  const guess = guessInput.value.trim().toLowerCase()
  const playerName = player.value.playerName.toLowerCase()

  // Permitir match parcial (nombre o apellido)
  const nameParts = playerName.split(' ')
  const isCorrect = nameParts.some(part => part.includes(guess) || guess.includes(part))

  gameOver.value = true
  won.value = isCorrect

  setTimeout(() => {
    emit('complete', isCorrect)
  }, 2000)
}

const giveUp = () => {
  gameOver.value = true
  won.value = false
  setTimeout(() => {
    emit('complete', false)
  }, 3000)
}
</script>

<template>
  <div class="enigmatico-overlay" @click.self="$emit('cancel')">
    <div class="enigmatico-container">
      <div class="game-header">
        <h2>🔍 Enigmático</h2>
        <button class="close-btn" @click="$emit('cancel')">✕</button>
      </div>

      <div class="game-content">
        <p class="instructions">
          Adivina el jugador por los equipos donde jugó
        </p>

        <div class="teams-grid">
          <div
            v-for="(team, index) in teamsToShow"
            :key="index"
            class="team-box"
          >
            <span class="team-number">{{ index + 1 }}</span>
            <span class="team-name">{{ team }}</span>
          </div>
        </div>

        <div class="hints-used" v-if="hints > 0">
          Pistas usadas: {{ hints }}
        </div>

        <div v-if="!gameOver" class="game-controls">
          <div class="guess-section">
            <input
              v-model="guessInput"
              type="text"
              placeholder="Escribe el nombre del jugador..."
              @keyup.enter="submitGuess"
              class="guess-input"
            />
            <button @click="submitGuess" class="submit-btn" :disabled="!guessInput.trim()">
              Confirmar
            </button>
          </div>

          <div class="action-buttons">
            <button
              @click="revealMoreTeams"
              class="reveal-btn"
              :disabled="!canRevealMore"
            >
              Revelar más equipos (+2)
            </button>
            <button @click="giveUp" class="giveup-btn">
              Me rindo
            </button>
          </div>
        </div>

        <div v-if="gameOver" class="result">
          <div v-if="won" class="won-message">
            <h3>¡Correcto! 🎉</h3>
            <p class="player-name">{{ player?.playerName }}</p>
            <p v-if="hints === 0" class="perfect">¡Sin pistas! Perfecto!</p>
            <p v-else class="hints-info">Usaste {{ hints }} pista(s)</p>
          </div>
          <div v-else class="lost-message">
            <h3>😔 Incorrecto</h3>
            <p class="player-name">Era: {{ player?.playerName }}</p>
            <div class="all-teams">
              <h4>Todos sus equipos:</h4>
              <div class="teams-list">
                <span v-for="(team, index) in player?.teams" :key="index" class="team-chip">
                  {{ team }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.enigmatico-overlay {
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
  overflow-y: auto;
}

.enigmatico-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
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

.instructions {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 25px;
  opacity: 0.95;
}

.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.team-box {
  background: rgba(255, 255, 255, 0.2);
  padding: 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.team-number {
  background: rgba(255, 255, 255, 0.3);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: bold;
  flex-shrink: 0;
}

.team-name {
  font-size: 0.95rem;
  font-weight: 500;
}

.hints-used {
  text-align: center;
  margin-bottom: 15px;
  color: #ffeb3b;
  font-weight: 600;
}

.game-controls {
  margin-top: 25px;
}

.guess-section {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.guess-input {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
}

.guess-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.submit-btn {
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.reveal-btn,
.giveup-btn {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
}

.reveal-btn {
  background: rgba(255, 255, 255, 0.2);
}

.reveal-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.giveup-btn {
  background: rgba(244, 67, 54, 0.8);
}

.result {
  margin-top: 20px;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
}

.won-message {
  background: rgba(76, 175, 80, 0.3);
  border: 2px solid #4caf50;
}

.lost-message {
  background: rgba(244, 67, 54, 0.3);
  border: 2px solid #f44336;
}

.player-name {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 10px 0;
  color: #ffd700;
}

.perfect {
  color: #4caf50;
  font-weight: 600;
  font-size: 1.1rem;
}

.hints-info {
  opacity: 0.9;
}

.all-teams {
  margin-top: 15px;
}

.all-teams h4 {
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.teams-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.team-chip {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .teams-grid {
    grid-template-columns: 1fr;
  }

  .guess-section {
    flex-direction: column;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
