import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        product1: 'public/produkte/1.html',
        product2: 'public/produkte/2.html',
        product3: 'public/produkte/3.html',
        product4: 'public/produkte/4.html',
        product5: 'public/produkte/5.html',
        product6: 'public/produkte/6.html',
      }
    }
  }
})