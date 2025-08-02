import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(() => {
  const env = loadEnv(process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), svgr()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: {
            '*': 'localhost',
          },
        },
      },
    },
  };
});
