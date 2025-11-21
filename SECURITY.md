# 🔒 Seguridad - Foobal

## Variables de Entorno

### ⚠️ NUNCA expongas claves API en el código

Este proyecto usa variables de entorno para proteger datos sensibles.

### Configuración de Variables de Entorno

1. **Copia el archivo de ejemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Edita `.env` con tus claves reales:**
   ```bash
   # NO COMMITEES ESTE ARCHIVO
   VITE_FOOTBALL_API_KEY=tu_clave_real_aqui
   ```

3. **El archivo `.env` está en `.gitignore`** - Nunca se subirá a Git

### APIs Disponibles

#### 🆓 TheSportsDB (Gratuito)
- URL: `https://www.thesportsdb.com/api/v1/json/3`
- No requiere API key para funcionalidad básica
- Incluye datos de Liga Profesional Argentina

#### 💰 API-Football (100 requests/día gratis)
- URL: `https://v3.football.api-sports.io`
- Registrarse en: https://www.api-football.com/
- Plan gratuito: 100 requests/día
- Más completa y actualizada

### Modo Mock (Sin API)

Si no configuras una API key, la aplicación funciona con datos mock de fútbol argentino.

### ✅ Buenas Prácticas

- ✅ Usa `.env` para desarrollo local
- ✅ Usa variables de entorno del sistema en producción
- ✅ Nunca commitees archivos `.env`
- ✅ Documenta todas las variables requeridas en `.env.example`
- ❌ NUNCA hardcodees API keys en el código
- ❌ NUNCA expongas `.env` en repositorios públicos

### Docker y Variables de Entorno

Para pasar variables de entorno al contenedor Docker:

```yaml
# docker-compose.yml
services:
  app:
    environment:
      - VITE_FOOTBALL_API_KEY=${FOOTBALL_API_KEY}
```

O usa un archivo `.env` que Docker Compose leerá automáticamente.

### Validación

La aplicación valida las variables de entorno al iniciar:
- Si falta `VITE_FOOTBALL_API_URL` → ❌ Error
- Si falta `VITE_FOOTBALL_API_KEY` → ⚠️ Warning (usa datos mock)

### Reportar Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad, por favor NO abras un issue público. Contacta al equipo de forma privada.
