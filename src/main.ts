import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { validateEnv } from './config/env'

// Validar variables de entorno al inicio
validateEnv()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
