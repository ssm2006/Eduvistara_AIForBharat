import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa'; // Disabled for faster dev startup
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    // PWA disabled in development for faster startup
    // Uncomment for production build
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   manifest: {
    //     name: 'EduVistara',
    //     short_name: 'EduVistara',
    //     description: 'AI-powered multilingual learning platform',
    //     theme_color: '#4285f4',
    //     background_color: '#ffffff',
    //     display: 'standalone',
    //     start_url: '/',
    //   }
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config')
    }
  },
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'mui-vendor': ['@mui/material', '@mui/icons-material']
        }
      }
    }
  }
});
