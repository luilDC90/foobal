/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FOOTBALL_API_URL: string
  readonly VITE_FOOTBALL_API_KEY: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
