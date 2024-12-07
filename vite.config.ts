import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    https: true,
    port: 3000,
  },
  plugins: [react(), mkcert()],
});
