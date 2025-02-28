import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { loadingFadeOut } from 'virtual:app-loading'
import App from './App.tsx'

import './index.css'

loadingFadeOut()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
