<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { footballApi } from '../services/footballApi'
import type { Question } from '../types/football'

interface Emits {
  (e: 'complete', correct: boolean): void
  (e: 'cancel'): void
}

const emit = defineEmits<Emits>()

const currentQuestion = ref<Question | null>(null)
const selectedOption = ref<number | null>(null)
const answered = ref<boolean>(false)
const isCorrect = ref<boolean>(false)

const selectRandomQuestion = (): void => {
  // Obtener pregunta del servicio de API
  currentQuestion.value = footballApi.getRandomQuestion()
}

const selectOption = (index: number): void => {
  if (answered.value) return
  selectedOption.value = index
}

const submitAnswer = (): void => {
  if (selectedOption.value === null) return

  answered.value = true
  isCorrect.value = selectedOption.value === currentQuestion.value.correct

  setTimeout(() => {
    emit('complete', isCorrect.value)
  }, 2000)
}

onMounted(() => {
  selectRandomQuestion()
})
</script>

<template>
  <div class="quiz-overlay" @click.self="$emit('cancel')">
    <div class="quiz-container">
      <div class="quiz-header">
        <h2>Desafío del Día ⚽</h2>
        <button class="close-btn" @click="$emit('cancel')">✕</button>
      </div>

      <div v-if="currentQuestion" class="quiz-content">
        <p class="question">{{ currentQuestion.question }}</p>

        <div class="options">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :class="[
              'option',
              {
                selected: selectedOption === index && !answered,
                correct: answered && index === currentQuestion.correct,
                incorrect: answered && selectedOption === index && !isCorrect
              }
            ]"
            @click="selectOption(index)"
            :disabled="answered"
          >
            {{ option }}
          </button>
        </div>

        <div v-if="answered" class="result">
          <div v-if="isCorrect" class="correct-message">
            <h3>¡Correcto! 🎉</h3>
            <p>Sumaste un día a tu racha 🔥</p>
          </div>
          <div v-else class="incorrect-message">
            <h3>Incorrecto 😔</h3>
            <p>La respuesta correcta era: {{ currentQuestion.options[currentQuestion.correct] }}</p>
            <p class="try-again">Intenta de nuevo mañana</p>
          </div>
        </div>

        <button
          v-if="!answered"
          class="submit-btn"
          @click="submitAnswer"
          :disabled="selectedOption === null"
        >
          Confirmar Respuesta
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.quiz-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.quiz-header h2 {
  margin: 0;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  padding: 0;
  font-size: 1.5rem;
}

.question {
  font-size: 1.3rem;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 600;
}

.options {
  display: grid;
  gap: 15px;
  margin-bottom: 25px;
}

.option {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  text-align: left;
  border-radius: 10px;
  transition: all 0.3s;
}

.option:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(5px);
}

.option.selected {
  background: rgba(255, 255, 255, 0.4);
  border: 2px solid white;
}

.option.correct {
  background: rgba(76, 175, 80, 0.8);
  border: 2px solid #4caf50;
}

.option.incorrect {
  background: rgba(244, 67, 54, 0.8);
  border: 2px solid #f44336;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
  font-weight: 600;
}

.result {
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
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

.try-again {
  margin-top: 10px;
  font-style: italic;
  opacity: 0.9;
}
</style>
