import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    
  ],
  css: {
    preprocessorOptions: {
      less: {
        math: 'parens-division',
        javascriptEnabled: true,
      },
      scss: {
        api: 'modern-compiler', // 或 "modern"，"legacy"
        importers: [
          // ...
        ],
      },
    },
  },
  resolve:{
    alias:{
      '@': '/src',
    }
  },
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:8080',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,'')
      }
  }}
})
