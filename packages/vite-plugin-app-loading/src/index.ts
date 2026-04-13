import type { PluginOption } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import url from 'node:url'

const defaultAppLoadingHtmlPath = url.fileURLToPath(new URL('../loading.html', import.meta.url))

function getAppLoadingHtml(filePath?: string): string {
  if (!filePath) {
    return fs.readFileSync(defaultAppLoadingHtmlPath, 'utf8')
  }

  const appLoadingHtmlPath = path.join(process.cwd(), filePath)
  if (!fs.existsSync(appLoadingHtmlPath)) {
    return fs.readFileSync(defaultAppLoadingHtmlPath, 'utf8')
  }

  return fs.readFileSync(appLoadingHtmlPath, 'utf8')
}

export default function (appLoadingHtmlPath?: string): PluginOption {
  const virtualModuleId = 'virtual:app-loading'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`
  return {
    name: 'vite-plugin-app-loading',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return {
          code: `
            export function loadingFadeOut() {
              const loadingEl = document.querySelector('[data-app-loading]')
              if (loadingEl) {
                loadingEl.style['pointer-events'] = 'none'
                loadingEl.style.visibility = 'hidden'
                loadingEl.style.opacity = 0
                loadingEl.style.transition = 'all 0.5s ease-out'
                loadingEl.addEventListener('transitionend', () => loadingEl.remove(), { once: true })
              }
            }
          `,
          map: null,
        }
      }
    },
    enforce: 'pre',
    transformIndexHtml: {
      handler: html => html.replace(/<\/body>/, `${
        `<div data-app-loading style="position: fixed; top: 0; left: 0; z-index: 10000; width: 100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; user-select: none;">${getAppLoadingHtml(appLoadingHtmlPath)}</div>`
      }</body>`),
      order: 'pre',
    },
  }
}
