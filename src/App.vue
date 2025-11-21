<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StreakCounter from './components/StreakCounter.vue'
import GamesMenu from './components/GamesMenu.vue'
import QuizChallenge from './components/QuizChallenge.vue'
import Enigmatico from './games/Enigmatico.vue'
import AscensoProfugo from './games/AscensoProfugo.vue'
import { useStreakStore } from './stores/streak'
import { useGamesStore } from './stores/games'
import { availableGames } from './data/games'
import type { GameType } from './types/games'

const streakStore = useStreakStore()
const gamesStore = useGamesStore()
const currentGame = ref<GameType | null>(null)

onMounted(() => {
  // Configurar juegos disponibles hoy
  gamesStore.setTodayGames(availableGames.map(g => g.id))
})

const selectGame = (gameType: GameType): void => {
  currentGame.value = gameType
  gamesStore.setCurrentGame(gameType)
}

const onGameComplete = (correct: boolean): void => {
  if (correct && currentGame.value) {
    gamesStore.completeGame(currentGame.value)
    streakStore.completeToday()
  }
  currentGame.value = null
}

const closeGame = (): void => {
  currentGame.value = null
}
</script>

<template>
  <div class="container">
    <h1>⚽ Foobal</h1>
    <p class="subtitle">Desafíos diarios de fútbol argentino</p>

    <StreakCounter :streak="streakStore.currentStreak" />

    <div class="games-section">
      <div v-if="gamesStore.allGamesCompleted" class="completed-message">
        <h2>🎉 ¡Completaste todos los juegos de hoy!</h2>
        <p>Vuelve mañana para más desafíos</p>
        <p class="streak-message">Racha actual: {{ streakStore.currentStreak }} días 🔥</p>
      </div>
      <div v-else>
        <GamesMenu @selectGame="selectGame" />
      </div>
    </div>

    <!-- Componentes de juegos -->
    <QuizChallenge
      v-if="currentGame === 'quiz'"
      @complete="onGameComplete"
      @cancel="closeGame"
    />

    <Enigmatico
      v-if="currentGame === 'enigmatico'"
      @complete="onGameComplete"
      @cancel="closeGame"
    />

    <AscensoProfugo
      v-if="currentGame === 'ascenso-profugo'"
      @complete="onGameComplete"
      @cancel="closeGame"
    />

    <!-- Próximamente: otros juegos -->
    <div
      v-if="currentGame && !['quiz', 'enigmatico', 'ascenso-profugo'].includes(currentGame)"
      class="coming-soon-overlay"
      @click="closeGame"
    >
      <div class="coming-soon" @click.stop>
        <h2>🚧 Próximamente</h2>
        <p>Este juego estará disponible pronto</p>
        <button @click="closeGame" class="close-btn-large">Volver</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.games-section {
  margin-top: 40px;
}

.completed-message {
  background: rgba(76, 175, 80, 0.2);
  padding: 40px;
  border-radius: 20px;
  border: 2px solid rgba(76, 175, 80, 0.5);
  text-align: center;
}

.completed-message h2 {
  color: #4caf50;
  margin-bottom: 15px;
  font-size: 2rem;
}

.completed-message p {
  opacity: 0.9;
  font-size: 1.1rem;
  margin: 10px 0;
}

.streak-message {
  font-size: 1.3rem !important;
  font-weight: bold;
  color: #ffd700;
  margin-top: 20px !important;
}

.coming-soon-overlay {
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
}

.coming-soon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 50px;
  border-radius: 20px;
  text-align: center;
  max-width: 400px;
}

.coming-soon h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.coming-soon p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.close-btn-large {
  padding: 15px 40px;
  font-size: 1.1rem;
  border-radius: 25px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

.close-btn-large:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}
</style>
