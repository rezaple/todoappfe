import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({mode})=> {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return {
    server:{
      port: parseInt(process.env.VITE_APP_PORT)
    },
    plugins: [
      react()
      , tailwindcss()],
  }

})
