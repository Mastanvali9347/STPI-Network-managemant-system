import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendBaseUrl =
    env.VITE_SOCKET_URL ||
    env.VITE_API_URL?.replace(/\/api\/?$/, '') ||
    'http://localhost:5001';

  return defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: backendBaseUrl,
          changeOrigin: true,
        },
        '/socket.io': {
          target: backendBaseUrl,
          changeOrigin: true,
          ws: true,
        },
      },
    },
  });
};
