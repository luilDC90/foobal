<script setup lang="ts">
import { availableGames } from '../data/games'
import { useGamesStore } from '../stores/games'
import type { GameType } from '../types/games'

interface Emits {
  (e: 'selectGame', gameType: GameType): void
}

const emit = defineEmits<Emits>()
const gamesStore = useGamesStore()

const selectGame = (gameType: GameType) => {
  emit('selectGame', gameType)
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'fácil':
      return '#4caf50'
    case 'medio':
      return '#ff9800'
    case 'difícil':
      return '#f44336'
    default:
      return '#757575'
  }
}
</script>

<template>
  <div class="games-menu">
    <div class="menu-header">
      <h2>🎮 Elige tu Juego</h2>
      <p class="progress">
        Completados hoy: {{ gamesStore.completedGamesToday }} / {{ availableGames.length }}
      </p>
    </div>

    <div class="games-grid">
      <div
        v-for="game in availableGames"
        :key="game.id"
        class="game-card"
        :class="{ completed: gamesStore.isGameCompleted(game.id) }"
        @click="selectGame(game.id)"
      >
        <div class="game-icon">{{ game.icon }}</div>
        <div class="game-info">
          <h3>{{ game.name }}</h3>
          <p class="description">{{ game.description }}</p>
          <div class="game-meta">
            <span
              class="difficulty"
              :style="{ backgroundColor: getDifficultyColor(game.difficulty) }"
            >
              {{ game.difficulty }}
            </span>
            <span v-if="gamesStore.isGameCompleted(game.id)" class="completed-badge">
              ✓ Completado
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.games-menu {
  width: 100%;
}

.menu-header {
  text-align: center;
  margin-bottom: 30px;
}

.menu-header h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.progress {
  font-size: 1.1rem;
  color: #ffd700;
  font-weight: 600;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 10px;
}

.game-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.game-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.game-card.completed {
  border-color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
}

.game-card.completed::before {
  content: '✓';
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  color: #4caf50;
  font-weight: bold;
}

.game-icon {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 15px;
}

.game-info h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #fff;
}

.description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 15px;
  line-height: 1.4;
  min-height: 40px;
}

.game-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.difficulty {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
}

.completed-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: #4caf50;
  color: white;
}

@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
}
</style>
