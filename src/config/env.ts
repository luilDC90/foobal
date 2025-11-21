// Configuración centralizada de variables de entorno
// Las variables VITE_ son las únicas expuestas al cliente

interface EnvConfig {
  footballApi: {
    url: string
    key: string
  }
  app: {
    name: string
    env: string
  }
}

export const env: EnvConfig = {
  footballApi: {
    url: import.meta.env.VITE_FOOTBALL_API_URL || '',
    key: import.meta.env.VITE_FOOTBALL_API_KEY || ''
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Foobal',
    env: import.meta.env.VITE_APP_ENV || 'development'
  }
}

// Validar que las variables críticas estén definidas
export function validateEnv(): void {
  const errors: string[] = []

  if (!env.footballApi.url) {
    errors.push('VITE_FOOTBALL_API_URL no está definida')
  }

  if (!env.footballApi.key || env.footballApi.key === 'your_api_key_here') {
    console.warn('⚠️ VITE_FOOTBALL_API_KEY no está configurada - usando datos mock')
  }

  if (errors.length > 0) {
    console.error('❌ Errores de configuración:', errors)
  }
}
