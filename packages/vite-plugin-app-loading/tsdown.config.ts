import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  deps: {
    neverBundle: [/^vite(?:\/.*)?$/],
  },
  fixedExtension: false,
  dts: {
    cjsReexport: true,
    resolver: 'tsc',
  },
})
