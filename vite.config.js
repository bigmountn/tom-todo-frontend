import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/todos': {
        target: 'https://tom-todo-backend-a77a7cb9808c.herokuapp.com',
        changeOrigin: true,
      },
    },
  },
})
