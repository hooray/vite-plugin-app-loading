import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import type { PluginOption } from 'vite'

async function getAppLoadingHtml(filePath: string = 'loading.html'): Promise<string> {
  let appLoadingHtmlPath = path.join(process.cwd(), filePath)
  if (!fs.existsSync(appLoadingHtmlPath)) {
    appLoadingHtmlPath = url.fileURLToPath(new URL('../loading.html', import.meta.url))
  }
  return await fs.readFileSync(appLoadingHtmlPath, 'utf8')
}

export default function (appLoadingHtmlPath?: string): PluginOption {
  const virtualModuleId = 'virtual:app-loading'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`
  return {
    name: 'vite-plugin-vue-app-loading',
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
      handler: async html => html.replace(/<\/body>/, `${
        `<div data-app-loading>${await getAppLoadingHtml(appLoadingHtmlPath)}</div>`
      }</body>`),
      order: 'pre',
    },
  }
}
