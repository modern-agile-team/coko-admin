import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import basicSsl from '@vitejs/plugin-basic-ssl';
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    https: true,
    port: 3000,
  },
  plugins: [react(), basicSsl()],
});
