import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    server: {
      proxy: isDevelopment
        ? {
            '/api/v1/users': 'http://localhost:8002', // Local backend URL
            '/api/v1/workers': 'http://localhost:8002',
            '/api/v1/details': 'http://localhost:8002',
          }
        : undefined, // No proxy in production
    },
    define: {
      // Dynamically set the API base URL for production
      'process.env.API_BASE_URL': JSON.stringify(
        isDevelopment
          ? 'http://localhost:8002' // Local backend URL
          : 'https://safemine.onrender.com' // Production backend URL
      ),
    },
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 1000,
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) {
                return 'react';
              }
              if (id.includes('axios')) {
                return 'axios';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
