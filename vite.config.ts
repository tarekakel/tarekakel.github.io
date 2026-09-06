import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'node:path'

const preview = process.env.PREVIEW === '1'

// base: '/' works for a repo named <user>.github.io.
// For a repo named e.g. "portfolio", set base: '/portfolio/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), ...(preview ? [viteSingleFile()] : [])],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
})
