# ⚽ Foobal - Desafíos Diarios de Fútbol Argentino

Aplicación web de quizzes de fútbol argentino con sistema de rachas (streaks) diarias.

## Características

- 🎮 **Múltiples Juegos**: 7 tipos de juegos diferentes (3 disponibles + 4 próximamente)
- 🇦🇷 **Fútbol Argentino**: 20 jugadores legendarios, 24 equipos (Primera + Ascenso)
- 🔥 **Sistema de rachas**: Suma fueguitos por cada día completado
- 🔒 **Seguro**: Variables de entorno protegidas, sin claves expuestas
- 🆓 **API Gratuita**: Integración con TheSportsDB y API-Football
- ⚽ **Juegos variados**: Enigmático, Ascenso/Prófugo, Quiz y más
- 💾 **Persistencia local**: localStorage para guardar tu progreso
- 🐳 **Dockerizado**: Fácil instalación y despliegue
- 🎨 **UI temática**: Diseño con colores de Argentina

### 🎮 Juegos Disponibles

1. **🔍 Enigmático** - Adivina el jugador por sus 12 equipos (Difícil)
2. **⬆️ Ascenso o Prófugo** - ¿Primera o Ascenso? (Fácil)
3. **❓ Quiz Clásico** - Preguntas de fútbol argentino (Fácil)
4. 🚧 **🖼️ 4 Imágenes 1 Jugador** - Próximamente
5. 🚧 **🎯 Adivina** - Resultados, rivales, escudos - Próximamente
6. 🚧 **📊 Tabla Cruzada** - Encuentra jugadores comunes - Próximamente
7. 🚧 **🏆 Ranking a Ciegas** - Ordena el top - Próximamente

## Requisitos

- Docker
- Docker Compose
- (Opcional) API key de API-Football para datos en vivo

## Instalación y Ejecución

### 1. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tu API key (opcional)
# Si no configuras API key, usará datos mock
```

**⚠️ IMPORTANTE:** Lee [SECURITY.md](./SECURITY.md) para configurar correctamente las variables de entorno.

### 2. Ejecutar con Docker

### Con Docker Compose (Recomendado)

```bash
# Construir y levantar el contenedor
docker-compose up --build

# La aplicación estará disponible en: http://localhost:5173
```

### Detener la aplicación

```bash
# Detener el contenedor
docker-compose down
```

## Cómo Jugar

1. Abre la aplicación en tu navegador
2. Haz clic en "Comenzar Desafío"
3. Responde la pregunta de fútbol del día
4. Si aciertas, sumas un día a tu racha 🔥
5. Vuelve cada día para mantener tu racha activa

## Reglas de las Rachas

- ✅ Completa el desafío cada día para incrementar tu racha
- ❌ Si respondes incorrectamente, no sumas día (pero no pierdes tu racha)
- ⚠️ Si dejas pasar más de 1 día sin completar, tu racha se reinicia

## Tecnologías

- **Vue.js 3** - Framework frontend con Composition API
- **TypeScript** - Tipado estático para código más seguro
- **Pinia** - State management moderno para Vue 3
- **Vite** - Build tool ultra rápido
- **Docker** - Containerización para fácil despliegue
- **localStorage** - Persistencia de datos del lado del cliente
- **TheSportsDB API** - Datos de fútbol argentino (gratis)
- **Variables de entorno** - Protección de claves API

## APIs Disponibles

### 🆓 TheSportsDB (Recomendada - Gratis)
- Sin límite de requests
- Datos de Liga Profesional Argentina
- No requiere API key

### 💰 API-Football (100 requests/día gratis)
- Plan gratuito: 100 requests/día
- Datos más completos y actualizados
- Requiere registro en https://www.api-football.com/

**Modo Sin API:** La app funciona con 15 preguntas predefinidas de fútbol argentino si no configuras ninguna API.

## Estructura del Proyecto

```
foobal/
├── src/
│   ├── components/
│   │   ├── StreakCounter.vue    # Visualización de fueguitos
│   │   └── QuizChallenge.vue    # Componente de quizzes
│   ├── stores/
│   │   └── streak.ts            # Pinia store de rachas
│   ├── services/
│   │   └── footballApi.ts       # Servicio de API de fútbol
│   ├── types/
│   │   └── football.ts          # Tipos TypeScript
│   ├── config/
│   │   └── env.ts               # Configuración de variables de entorno
│   ├── App.vue                  # Componente principal
│   ├── main.ts                  # Entry point
│   ├── style.css                # Estilos globales
│   └── vite-env.d.ts           # Tipos de Vite
├── .env.example                 # Plantilla de variables de entorno
├── .env                         # Variables de entorno (NO commitear)
├── .gitignore                   # Archivos ignorados por Git
├── Dockerfile                   # Configuración Docker
├── docker-compose.yml           # Orquestación Docker
├── tsconfig.json                # Configuración TypeScript
├── tsconfig.node.json
├── vite.config.ts               # Configuración Vite
├── package.json
├── README.md                    # Este archivo
└── SECURITY.md                  # Guía de seguridad
```

## 🔒 Seguridad

Este proyecto implementa buenas prácticas de seguridad:
- ✅ Variables de entorno para claves API
- ✅ Archivo `.env` en `.gitignore`
- ✅ Validación de variables al inicio
- ✅ Modo fallback sin API key
- ✅ Documentación en `SECURITY.md`

**Lee [SECURITY.md](./SECURITY.md) antes de usar el proyecto.**
