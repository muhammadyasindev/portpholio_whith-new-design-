import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5050',
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.warn('[Vite Proxy] Backend at http://127.0.0.1:5050 unreachable:', err.message);
            if (res && res.writeHead && !res.headersSent) {
              res.writeHead(503, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: false,
                message: 'Backend API server is not running on port 5050. Please run "node server.js".'
              }));
            }
          });
        }
      },
      '/uploads': {
        target: 'http://127.0.0.1:5050',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
