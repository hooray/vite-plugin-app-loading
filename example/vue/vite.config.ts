import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import appLoading from 'vite-plugin-app-loading'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), appLoading()],
})
