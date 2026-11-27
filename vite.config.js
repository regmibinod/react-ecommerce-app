import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Configure Vite for deployment at the domain root.
export default defineConfig({
  plugins: [react()],
  base: '/',
})