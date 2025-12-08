import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-helmet': path.resolve(__dirname, 'src/lib/helmet.js'),
      'react-toastify': path.resolve(__dirname, 'src/lib/toastify.jsx'),
      'react-icons': path.resolve(__dirname, 'src/lib/icons.jsx'),
      'react-icons/fa': path.resolve(__dirname, 'src/lib/icons.jsx'),
      'styled-components': path.resolve(__dirname, 'src/lib/styled.js'),
      'bootstrap/dist/css/bootstrap.min.css': path.resolve(__dirname, 'src/styles/bootstrap-lite.css'),
    }
  }
})
