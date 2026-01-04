import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base:'/blog_2.0/',
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
})