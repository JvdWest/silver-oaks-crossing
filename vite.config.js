import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'silver-oaks-crossing' with your actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/silver-oaks-crossing/',
})
