<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRandomFrase } from '../data/frases'
import type { FraseIconica } from '../data/frases'

interface Emits {
  (e: 'complete', correct: boolean): void
  (e: 'cancel'): void
}

const emit = defineEmits<Emits>()

const frase = ref<FraseIconica | null>(null)
const selectedOption = ref<string>('')
const gameOver = ref(false)
const won = ref(false)
const showImage = ref(false)

onMounted(() => {
  frase.value = getRandomFrase()
})

const selectOption = (option: string) => {
  if (gameOver.value) return

  selectedOption.value = option
  gameOver.value = true
  won.value = option === frase.value?.autor

  if (won.value) {
    // Si acertó, mostrar la imagen después de un pequeño delay
    setTimeout(() => {
      showImage.value = true
    }, 500)
  }

  setTimeout(() => {
    emit('complete', won.value)
  }, won.value ? 3000 : 2000)
}

const getButtonClass = (option: string): string => {
  if (!gameOver.value) return ''

  if (option === frase.value?.autor) {
    return 'correct'
  }

  if (option === selectedOption.value && !won.value) {
    return 'incorrect'
  }

  return 'disabled'
}
</script>

<template>
  <div class="frases-overlay" @click.self="$emit('cancel')">
    <div class="frases-container">
      <div class="game-header">
        <h2>💬 Frases Icónicas</h2>
        <button class="close-btn" @click="$emit('cancel')">✕</button>
      </div>

      <div class="game-content">
        <p class="instructions">
          ¿Quién dijo esta frase icónica del fútbol argentino?
        </p>

        <div class="frase-box">
          <div class="quote-icon">"</div>
          <p class="frase-text">{{ frase?.frase }}</p>
          <div class="quote-icon closing">"</div>
        </div>

        <div v-if="!gameOver" class="options-grid">
          <button
            v-for="option in frase?.opciones"
            :key="option"
            @click="selectOption(option)"
            class="option-btn"
          >
            {{ option }}
          </button>
        </div>

        <div v-if="gameOver" class="result">
          <div v-if="won" class="won-message">
            <h3>¡Correcto! 🎉</h3>
            <p class="autor-name">{{ frase?.autor }}</p>
            <p v-if="frase?.contexto" class="contexto">{{ frase.contexto }}</p>

            <div v-if="showImage" class="image-container">
              <img
                :src="frase?.imagen"
                :alt="frase?.autor"
                class="autor-image"
                @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
              />
            </div>
          </div>
          <div v-else class="lost-message">
            <h3>😔 Incorrecto</h3>
            <p class="correct-answer">Era: <strong>{{ frase?.autor }}</strong></p>
            <p v-if="frase?.contexto" class="contexto">{{ frase.contexto }}</p>
          </div>
        </div>

        <div v-if="gameOver" class="options-grid revealed">
          <button
            v-for="option in frase?.opciones"
            :key="option"
            :class="['option-btn', getButtonClass(option)]"
            disabled
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frases-overlay {
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

.frases-container {
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
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.instructions {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 25px;
  opacity: 0.95;
}

.frase-box {
  background: rgba(255, 255, 255, 0.2);
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.quote-icon {
  position: absolute;
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.3);
  font-family: Georgia, serif;
  line-height: 0.5;
  top: 20px;
  left: 20px;
}

.quote-icon.closing {
  top: auto;
  left: auto;
  bottom: 20px;
  right: 20px;
}

.frase-text {
  font-size: 1.4rem;
  font-style: italic;
  text-align: center;
  line-height: 1.6;
  margin: 20px 0;
  position: relative;
  z-index: 1;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.option-btn {
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.option-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.option-btn:active:not(:disabled) {
  transform: translateY(-1px);
}

.option-btn.correct {
  background: rgba(76, 175, 80, 0.4);
  border-color: #4caf50;
  animation: pulse 0.6s;
}

.option-btn.incorrect {
  background: rgba(244, 67, 54, 0.4);
  border-color: #f44336;
  animation: shake 0.5s;
}

.option-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
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

.autor-name {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 10px 0;
  color: #ffd700;
}

.correct-answer {
  font-size: 1.2rem;
  margin: 10px 0;
}

.correct-answer strong {
  color: #ffd700;
}

.contexto {
  margin-top: 15px;
  font-size: 0.95rem;
  opacity: 0.9;
  font-style: italic;
}

.image-container {
  margin-top: 20px;
  animation: fadeIn 0.8s ease-in;
}

.autor-image {
  max-width: 300px;
  width: 100%;
  height: auto;
  border-radius: 15px;
  border: 3px solid #ffd700;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.options-grid.revealed {
  pointer-events: none;
}

@media (max-width: 600px) {
  .options-grid {
    grid-template-columns: 1fr;
  }

  .frase-text {
    font-size: 1.2rem;
  }

  .quote-icon {
    font-size: 3rem;
  }

  .frases-container {
    padding: 20px;
  }

  .autor-image {
    max-width: 250px;
  }
}
</style>
