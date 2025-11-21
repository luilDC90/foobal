import { env } from '../config/env'
import type { Question } from '../types/football'

// API gratuita de TheSportsDB para fútbol argentino
const THESPORTSDB_API = 'https://www.thesportsdb.com/api/v1/json/3'

class FootballApiService {
  private useMockData: boolean

  constructor() {
    // Si no hay API key configurada, usar datos mock
    this.useMockData = !env.footballApi.key || env.footballApi.key === 'your_api_key_here'

    if (this.useMockData) {
      console.log('🎲 Usando datos mock de fútbol argentino')
    }
  }

  // Obtener equipos de la Liga Profesional Argentina
  async getArgentineTeams() {
    if (this.useMockData) {
      return this.getMockTeams()
    }

    try {
      // TheSportsDB - Liga Profesional Argentina (ID: 4406)
      const response = await fetch(`${THESPORTSDB_API}/lookup_all_teams.php?id=4406`)
      const data = await response.json()
      return data.teams || this.getMockTeams()
    } catch (error) {
      console.error('Error fetching teams:', error)
      return this.getMockTeams()
    }
  }

  // Datos mock de equipos argentinos
  private getMockTeams() {
    return [
      { strTeam: 'River Plate', strBadge: '', strStadium: 'Estadio Monumental' },
      { strTeam: 'Boca Juniors', strBadge: '', strStadium: 'La Bombonera' },
      { strTeam: 'Racing Club', strBadge: '', strStadium: 'Estadio Presidente Perón' },
      { strTeam: 'Independiente', strBadge: '', strStadium: 'Estadio Libertadores de América' },
      { strTeam: 'San Lorenzo', strBadge: '', strStadium: 'Estadio Pedro Bidegain' },
      { strTeam: 'Vélez Sarsfield', strBadge: '', strStadium: 'José Amalfitani' },
      { strTeam: 'Estudiantes', strBadge: '', strStadium: 'Estadio Jorge Luis Hirschi' },
      { strTeam: 'Gimnasia La Plata', strBadge: '', strStadium: 'Estadio Juan Carmelo Zerillo' },
      { strTeam: 'Talleres', strBadge: '', strStadium: 'Mario Alberto Kempes' },
      { strTeam: 'Lanús', strBadge: '', strStadium: 'Estadio Ciudad de Lanús' }
    ]
  }

  // Preguntas específicas de fútbol argentino
  getArgentineQuestions(): Question[] {
    return [
      {
        question: '¿Cuántas Copas Libertadores tiene River Plate?',
        options: ['2', '4', '5', '7'],
        correct: 1,
        category: 'teams'
      },
      {
        question: '¿En qué año Boca ganó su primera Copa Libertadores?',
        options: ['1977', '1978', '2000', '2001'],
        correct: 1,
        category: 'history'
      },
      {
        question: '¿Qué jugador argentino ganó más Balones de Oro?',
        options: ['Maradona', 'Di María', 'Messi', 'Batistuta'],
        correct: 2,
        category: 'players'
      },
      {
        question: '¿Cuál es el estadio más grande de Argentina?',
        options: ['La Bombonera', 'Monumental', 'Libertadores de América', 'Mario Kempes'],
        correct: 1,
        category: 'general'
      },
      {
        question: '¿Qué equipo argentino tiene más títulos internacionales?',
        options: ['Boca Juniors', 'River Plate', 'Independiente', 'Racing'],
        correct: 2,
        category: 'teams'
      },
      {
        question: '¿En qué año Argentina ganó su primer Mundial?',
        options: ['1978', '1986', '1930', '1974'],
        correct: 0,
        category: 'history'
      },
      {
        question: '¿Cómo se llama el clásico entre River y Boca?',
        options: ['Clásico Porteño', 'Superclásico', 'Derby Argentino', 'Clásico del Río'],
        correct: 1,
        category: 'general'
      },
      {
        question: '¿Qué jugador es apodado "El Apache"?',
        options: ['Riquelme', 'Tévez', 'Agüero', 'Di María'],
        correct: 1,
        category: 'players'
      },
      {
        question: '¿Cuántas Copas América ganó Argentina?',
        options: ['14', '15', '16', '17'],
        correct: 1,
        category: 'history'
      },
      {
        question: '¿En qué ciudad jugó Maradona en Argentina antes de ir a Europa?',
        options: ['Buenos Aires (Boca)', 'Rosario', 'Buenos Aires (Argentinos Juniors)', 'La Plata'],
        correct: 2,
        category: 'players'
      },
      {
        question: '¿Qué equipo es conocido como "La Academia"?',
        options: ['Estudiantes', 'Racing', 'Vélez', 'Independiente'],
        correct: 1,
        category: 'teams'
      },
      {
        question: '¿Cuántos goles hizo Messi en el Mundial 2022?',
        options: ['5', '6', '7', '8'],
        correct: 2,
        category: 'players'
      },
      {
        question: '¿Qué equipo es apodado "El Rojo"?',
        options: ['Independiente', 'San Lorenzo', 'Estudiantes', 'Huracán'],
        correct: 0,
        category: 'teams'
      },
      {
        question: '¿En qué año se fundó la AFA (Asociación del Fútbol Argentino)?',
        options: ['1891', '1893', '1901', '1910'],
        correct: 1,
        category: 'history'
      },
      {
        question: '¿Qué DT argentino ganó 2 Copas Libertadores con Boca?',
        options: ['Menotti', 'Bilardo', 'Bianchi', 'Passarella'],
        correct: 2,
        category: 'history'
      }
    ]
  }

  // Obtener pregunta aleatoria
  getRandomQuestion(): Question {
    const questions = this.getArgentineQuestions()
    const randomIndex = Math.floor(Math.random() * questions.length)
    return questions[randomIndex]
  }
}

export const footballApi = new FootballApiService()
