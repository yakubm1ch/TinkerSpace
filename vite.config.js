import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './', // works for GitHub Pages project sites
  build: {
    outDir: 'dist',
  },
})
