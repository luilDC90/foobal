export type GameType =
  | 'enigmatico'      // Adivinar jugador por 12 equipos
  | '4imagenes'       // 4 imágenes 1 jugador
  | 'adivina'         // Adivinar resultado/rival/escudos
  | 'tabla-cruzada'   // Tabla cruzada de escudos
  | 'ranking-ciegas'  // Armar el Top
  | 'ascenso-profugo' // Jugador del ascenso o prófugo
  | 'quiz'            // Quiz clásico
  | 'frases-iconicas' // Adivinar frases icónicas del fútbol argentino

export interface GameInfo {
  id: GameType
  name: string
  description: string
  icon: string
  difficulty: 'fácil' | 'medio' | 'difícil'
}

export interface PlayerCareer {
  playerId: string
  playerName: string
  teams: string[]  // 12 equipos donde jugó
  image?: string
  position?: string
  nationality?: string
}

export interface MatchResult {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  date: string
  competition: string
}

export interface TeamBadge {
  teamId: string
  teamName: string
  badge: string
  division: 'primera' | 'ascenso'
  colors: string[]
}

export interface PlayerRanking {
  playerId: string
  playerName: string
  stat: string  // ej: "goles", "asistencias", "partidos"
  value: number
  team: string
}
