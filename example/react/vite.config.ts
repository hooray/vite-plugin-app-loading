import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import appLoading from 'vite-plugin-app-loading'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), appLoading()],
})
