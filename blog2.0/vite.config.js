import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base path for GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/blog_2.0/' : '/',
  plugins: [react()],
})
