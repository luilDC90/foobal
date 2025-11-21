# 🚀 Inicio Rápido - Foobal

## En 3 pasos

### 1️⃣ Clonar/Descargar el proyecto
```bash
cd foobal
```

### 2️⃣ (Opcional) Configurar API
```bash
# Solo si quieres usar API real
cp .env.example .env
# Editar .env con tu API key
```

### 3️⃣ Ejecutar con Docker
```bash
docker compose up --build
```

🎉 **Listo!** Abre http://localhost:5173

---

## Modo Rápido (Sin API)

Si NO configuras API key, la app funciona con **15 preguntas mock** de fútbol argentino. Ideal para:
- ✅ Probar la app rápidamente
- ✅ Desarrollo sin límites de requests
- ✅ No requiere registro en ningún servicio

---

## Comandos Docker

```bash
# Iniciar
docker compose up

# Iniciar en background
docker compose up -d

# Ver logs
docker compose logs -f

# Detener
docker compose down

# Rebuild completo
docker compose up --build
```

---

## APIs Disponibles

### TheSportsDB (Gratis, sin límites)
```env
VITE_FOOTBALL_API_URL=https://www.thesportsdb.com/api/v1/json/3
VITE_FOOTBALL_API_KEY=test
```

### API-Football (100 req/día gratis)
```env
VITE_FOOTBALL_API_URL=https://v3.football.api-sports.io
VITE_FOOTBALL_API_KEY=tu_key_aqui
```
Registrarse en: https://www.api-football.com/

---

## Problemas Comunes

### Puerto 5173 ocupado
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "3000:5173"  # Ahora en puerto 3000
```

### Variables de entorno no cargan
```bash
# Reiniciar contenedor
docker compose down
docker compose up --build
```

### Hot reload no funciona
El hot reload funciona automáticamente con Docker volumes. Si no funciona:
```bash
docker compose down
docker compose up --build
```

---

## Próximos Pasos

1. ✅ Completar el desafío de hoy
2. 📖 Leer [README.md](./README.md) completo
3. 🔒 Revisar [SECURITY.md](./SECURITY.md) para seguridad
4. 🎨 Personalizar preguntas en `src/services/footballApi.ts`
5. 🚀 Desplegar en producción

---

**¿Dudas?** Revisa la documentación completa en [README.md](./README.md)
