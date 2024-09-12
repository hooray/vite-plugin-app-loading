import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

import { loadingFadeOut } from 'virtual:app-loading'
loadingFadeOut()