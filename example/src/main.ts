import { loadingFadeOut } from 'virtual:app-loading'
import { createApp } from 'vue'
import App from './App.vue'

import './style.css'

createApp(App).mount('#app')

loadingFadeOut()
