import type { GameInfo, GameType } from '../types/games'

export const availableGames: GameInfo[] = [
  {
    id: 'enigmatico',
    name: 'Enigmático',
    description: 'Adivina el jugador por sus 12 equipos',
    icon: '🔍',
    difficulty: 'difícil'
  },
  {
    id: '4imagenes',
    name: '4 Imágenes 1 Jugador',
    description: 'Descubre el jugador a partir de 4 pistas visuales',
    icon: '🖼️',
    difficulty: 'medio'
  },
  {
    id: 'adivina',
    name: 'Adivina',
    description: 'Adivina el resultado, rival o escudos',
    icon: '🎯',
    difficulty: 'medio'
  },
  {
    id: 'tabla-cruzada',
    name: 'Tabla Cruzada',
    description: 'Encuentra jugadores que jugaron en 2 equipos',
    icon: '📊',
    difficulty: 'difícil'
  },
  {
    id: 'ranking-ciegas',
    name: 'Ranking a Ciegas',
    description: 'Ordena el top de goleadores correctamente',
    icon: '🏆',
    difficulty: 'medio'
  },
  {
    id: 'ascenso-profugo',
    name: 'Ascenso o Prófugo',
    description: '¿Este jugador está en Primera o en Ascenso?',
    icon: '⬆️',
    difficulty: 'fácil'
  },
  {
    id: 'quiz',
    name: 'Quiz Clásico',
    description: 'Preguntas de cultura futbolera argentina',
    icon: '❓',
    difficulty: 'fácil'
  },
  {
    id: 'frases-iconicas',
    name: 'Frases Icónicas',
    description: 'Adivina quién dijo estas frases míticas del fútbol argentino',
    icon: '💬',
    difficulty: 'medio'
  }
]

export const getGameById = (id: GameType): GameInfo | undefined => {
  return availableGames.find(game => game.id === id)
}

export const getGamesByDifficulty = (difficulty: 'fácil' | 'medio' | 'difícil'): GameInfo[] => {
  return availableGames.filter(game => game.difficulty === difficulty)
}
