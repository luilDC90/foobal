import type { PlayerCareer } from '../types/games'

export const argentinePlayers: PlayerCareer[] = [
  {
    playerId: 'messi',
    playerName: 'Lionel Messi',
    teams: ['Newell\'s Old Boys', 'Barcelona', 'PSG', 'Inter Miami'],
    position: 'Delantero',
    nationality: 'Argentina'
  },
  {
    playerId: 'maradona',
    playerName: 'Diego Maradona',
    teams: ['Argentinos Juniors', 'Boca Juniors', 'Barcelona', 'Napoli', 'Sevilla', 'Newell\'s Old Boys'],
    position: 'Mediocampista',
    nationality: 'Argentina'
  },
  {
    playerId: 'riquelme',
    playerName: 'Juan Román Riquelme',
    teams: ['Argentinos Juniors', 'Boca Juniors', 'Barcelona', 'Villarreal'],
    position: 'Mediocampista',
    nationality: 'Argentina'
  },
  {
    playerId: 'tevez',
    playerName: 'Carlos Tévez',
    teams: ['Boca Juniors', 'Corinthians', 'West Ham', 'Manchester United', 'Manchester City', 'Juventus', 'Shanghai Shenhua'],
    position: 'Delantero',
    nationality: 'Argentina'
  },
  {
    playerId: 'batistuta',
    playerName: 'Gabriel Batistuta',
    teams: ['Newell\'s Old Boys', 'River Plate', 'Boca Juniors', 'Fiorentina', 'Roma', 'Inter'],
    position: 'Delantero',
    nationality: 'Argentina'
  },
  {
    playerId: 'crespo',
    playerName: 'Hernán Crespo',
    teams: ['River Plate', 'Parma', 'Lazio', 'Inter', 'Milan', 'Chelsea', 'Genoa'],
    position: 'Delantero',
    nationality: 'Argentina'
  },
  {
    playerId: 'redondo',
    playerName: 'Fernando Redondo',
    teams: ['Argentinos Juniors', 'Tenerife', 'Real Madrid', 'Milan'],
    position: 'Mediocampista',
    nationality: 'Argentina'
  },
  {
    playerId: 'ortega',
    playerName: 'Ariel Ortega',
    teams: ['River Plate', 'Valencia', 'Parma', 'Sampdoria', 'Newell\'s Old Boys'],
    position: 'Mediocampista',
    nationality: 'Argentina'
  },
  {
    playerId: 'saviola',
    playerName: 'Javier Saviola',
    teams: ['River Plate', 'Barcelona', 'Monaco', 'Sevilla', 'Real Madrid', 'Benfica', 'Olympiacos', 'Málaga', 'Verona'],
    position: 'Delantero',
    nationality: 'Argentina'
  },
  {
    playerId: 'aimar',
    playerName: 'Pablo Aimar',
    teams: ['River Plate', 'Valencia', 'Zaragoza', 'Benfica', 'Johor Darul Ta\'zim'],
    position: 'Mediocampista',
    nationality: 'Argentina'
  },
  {
    playerId: 'mascherano',
    playerName: 'Javier Mascherano',
    teams: ['River Plate', 'Corinthians', 'West Ham', 'Liverpool', 'Barcelona', 'Hebei China Fortune', 'Estudiantes'],
    position: 'Mediocampista',
    nationality: 'Argentina'
  },
  {
    playerId: 'aguero',
    playerName: 'Sergio Agüero',
    teams: ['Independiente', 'Atlético Madrid', 'Manchester City', 'Barcelona'],
    position: 'Delantero',
    nationality: 'Argentina'
  },
  {
    playerId: 'di-maria',
    playerName: 'Ángel Di María',
    teams: ['Rosario Central', 'Benfica', 'Real Madrid', 'Manchester United', 'PSG', 'Juventus'],
    position: 'Mediocampista',
    nationality: 'Argentina'
  },
  {
    playerId: 'higuain',
    playerName: 'Gonzalo Higuaín',
    teams: ['River Plate', 'Real Madrid', 'Napoli', 'Juventus', 'Milan', 'Chelsea', 'Inter Miami'],
    position: 'Delantero',
    nationality: 'Argentina'
  },
  {
    playerId: 'zanetti',
    playerName: 'Javier Zanetti',
    teams: ['Talleres', 'Banfield', 'Inter'],
    position: 'Defensor',
    nationality: 'Argentina'
  },
  {
    playerId: 'ayala',
    playerName: 'Roberto Ayala',
    teams: ['Ferro Carril Oeste', 'River Plate', 'Napoli', 'Milan', 'Valencia', 'Villarreal', 'Zaragoza', 'Racing'],
    position: 'Defensor',
    nationality: 'Argentina'
  },
  {
    playerId: 'samuel',
    playerName: 'Walter Samuel',
    teams: ['Newell\'s Old Boys', 'Boca Juniors', 'Roma', 'Real Madrid', 'Inter', 'Basel'],
    position: 'Defensor',
    nationality: 'Argentina'
  },
  {
    playerId: 'veron',
    playerName: 'Juan Sebastián Verón',
    teams: ['Estudiantes', 'Boca Juniors', 'Sampdoria', 'Parma', 'Lazio', 'Manchester United', 'Chelsea', 'Inter'],
    position: 'Mediocampista',
    nationality: 'Argentina'
  },
  {
    playerId: 'palermo',
    playerName: 'Martín Palermo',
    teams: ['Estudiantes', 'Boca Juniors', 'Villarreal', 'Betis', 'Alavés'],
    position: 'Delantero',
    nationality: 'Argentina'
  },
  {
    playerId: 'gago',
    playerName: 'Fernando Gago',
    teams: ['Boca Juniors', 'Real Madrid', 'Roma', 'Valencia', 'Vélez Sarsfield', 'Racing'],
    position: 'Mediocampista',
    nationality: 'Argentina'
  }
]

export const getPlayerById = (id: string): PlayerCareer | undefined => {
  return argentinePlayers.find(player => player.playerId === id)
}

export const getRandomPlayer = (): PlayerCareer => {
  const randomIndex = Math.floor(Math.random() * argentinePlayers.length)
  return argentinePlayers[randomIndex]
}

export const getRandomPlayers = (count: number): PlayerCareer[] => {
  const shuffled = [...argentinePlayers].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
