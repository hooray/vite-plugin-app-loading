import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import appLoading from 'vite-plugin-app-loading'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), appLoading('loading.html')],
})
