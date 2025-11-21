import type { TeamBadge } from '../types/games'

export const argentineTeams: TeamBadge[] = [
  // Primera División
  {
    teamId: 'river',
    teamName: 'River Plate',
    badge: '🔴⚪',
    division: 'primera',
    colors: ['#FFFFFF', '#FF0000']
  },
  {
    teamId: 'boca',
    teamName: 'Boca Juniors',
    badge: '💙💛',
    division: 'primera',
    colors: ['#002D80', '#FFDD00']
  },
  {
    teamId: 'racing',
    teamName: 'Racing Club',
    badge: '💙⚪',
    division: 'primera',
    colors: ['#69B3E7', '#FFFFFF']
  },
  {
    teamId: 'independiente',
    teamName: 'Independiente',
    badge: '🔴⚪',
    division: 'primera',
    colors: ['#FF0000', '#FFFFFF']
  },
  {
    teamId: 'san-lorenzo',
    teamName: 'San Lorenzo',
    badge: '🔴🔵',
    division: 'primera',
    colors: ['#FF0000', '#0000FF']
  },
  {
    teamId: 'velez',
    teamName: 'Vélez Sarsfield',
    badge: '🔵⚪',
    division: 'primera',
    colors: ['#0047AB', '#FFFFFF']
  },
  {
    teamId: 'estudiantes',
    teamName: 'Estudiantes de La Plata',
    badge: '🔴⚪',
    division: 'primera',
    colors: ['#FF0000', '#FFFFFF']
  },
  {
    teamId: 'gimnasia',
    teamName: 'Gimnasia La Plata',
    badge: '🔵⚪',
    division: 'primera',
    colors: ['#0047AB', '#FFFFFF']
  },
  {
    teamId: 'talleres',
    teamName: 'Talleres de Córdoba',
    badge: '🔵⚪',
    division: 'primera',
    colors: ['#0047AB', '#FFFFFF']
  },
  {
    teamId: 'lanus',
    teamName: 'Lanús',
    badge: '🔴⚪',
    division: 'primera',
    colors: ['#8B0000', '#FFFFFF']
  },
  {
    teamId: 'huracan',
    teamName: 'Huracán',
    badge: '⚪🔴',
    division: 'primera',
    colors: ['#FFFFFF', '#FF0000']
  },
  {
    teamId: 'banfield',
    teamName: 'Banfield',
    badge: '💚⚪',
    division: 'primera',
    colors: ['#00A550', '#FFFFFF']
  },
  {
    teamId: 'argentinos',
    teamName: 'Argentinos Juniors',
    badge: '🔴⚪',
    division: 'primera',
    colors: ['#FF0000', '#FFFFFF']
  },
  {
    teamId: 'colon',
    teamName: 'Colón',
    badge: '🔴⚫',
    division: 'primera',
    colors: ['#FF0000', '#000000']
  },
  {
    teamId: 'newells',
    teamName: 'Newell\'s Old Boys',
    badge: '🔴⚫',
    division: 'primera',
    colors: ['#FF0000', '#000000']
  },
  {
    teamId: 'rosario-central',
    teamName: 'Rosario Central',
    badge: '💙💛',
    division: 'primera',
    colors: ['#003DA5', '#FFDD00']
  },
  {
    teamId: 'belgrano',
    teamName: 'Belgrano',
    badge: '💙⚪',
    division: 'primera',
    colors: ['#6CACE4', '#FFFFFF']
  },
  {
    teamId: 'instituto',
    teamName: 'Instituto',
    badge: '🔴⚪',
    division: 'primera',
    colors: ['#FF0000', '#FFFFFF']
  },

  // Nacional B (Ascenso)
  {
    teamId: 'atlanta',
    teamName: 'Atlanta',
    badge: '💛🔵',
    division: 'ascenso',
    colors: ['#FFDD00', '#0047AB']
  },
  {
    teamId: 'chacarita',
    teamName: 'Chacarita Juniors',
    badge: '🔴⚫',
    division: 'ascenso',
    colors: ['#FF0000', '#000000']
  },
  {
    teamId: 'ferro',
    teamName: 'Ferro Carril Oeste',
    badge: '💚⚪',
    division: 'ascenso',
    colors: ['#00A550', '#FFFFFF']
  },
  {
    teamId: 'all-boys',
    teamName: 'All Boys',
    badge: '⚪⚫',
    division: 'ascenso',
    colors: ['#FFFFFF', '#000000']
  },
  {
    teamId: 'temperley',
    teamName: 'Temperley',
    badge: '💙⚪',
    division: 'ascenso',
    colors: ['#0047AB', '#FFFFFF']
  },
  {
    teamId: 'brown-adrogue',
    teamName: 'Brown de Adrogué',
    badge: '🔴⚫',
    division: 'ascenso',
    colors: ['#FF0000', '#000000']
  }
]

export const getTeamById = (id: string): TeamBadge | undefined => {
  return argentineTeams.find(team => team.teamId === id)
}

export const getTeamsByDivision = (division: 'primera' | 'ascenso'): TeamBadge[] => {
  return argentineTeams.filter(team => team.division === division)
}

export const getRandomTeams = (count: number, division?: 'primera' | 'ascenso'): TeamBadge[] => {
  const teams = division ? getTeamsByDivision(division) : argentineTeams
  const shuffled = [...teams].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
