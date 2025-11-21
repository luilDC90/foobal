<script setup lang="ts">
interface Props {
  streak: number
}

withDefaults(defineProps<Props>(), {
  streak: 0
})
</script>

<template>
  <div class="streak-counter">
    <div class="streak-display">
      <div class="fire-emoji">🔥</div>
      <div class="streak-number">{{ streak }}</div>
      <div class="streak-label">{{ streak === 1 ? 'día' : 'días' }} consecutivos</div>
    </div>

    <div class="streak-fires" v-if="streak > 0">
      <span v-for="n in Math.min(streak, 30)" :key="n" class="fire-small">🔥</span>
    </div>

    <div class="motivational-message">
      <p v-if="streak === 0">¡Comienza tu racha hoy!</p>
      <p v-else-if="streak < 3">¡Buen comienzo! Sigue así</p>
      <p v-else-if="streak < 7">¡Excelente! Casi una semana</p>
      <p v-else-if="streak < 30">¡Increíble racha! 🏆</p>
      <p v-else>¡ERES UNA LEYENDA! 👑</p>
    </div>
  </div>
</template>

<style scoped>
.streak-counter {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  margin-bottom: 30px;
}

.streak-display {
  margin-bottom: 20px;
}

.fire-emoji {
  font-size: 4rem;
  animation: flicker 1.5s infinite alternate;
}

@keyframes flicker {
  0% {
    transform: scale(1) rotate(-5deg);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
    filter: brightness(1.2);
  }
  100% {
    transform: scale(1) rotate(-5deg);
    filter: brightness(1);
  }
}

.streak-number {
  font-size: 3rem;
  font-weight: bold;
  margin: 10px 0;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.streak-label {
  font-size: 1.1rem;
  opacity: 0.9;
}

.streak-fires {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  margin: 20px 0;
  max-height: 100px;
  overflow: hidden;
}

.fire-small {
  font-size: 1.2rem;
  animation: popIn 0.3s ease-out;
}

@keyframes popIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.motivational-message {
  margin-top: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffd700;
}
</style>
