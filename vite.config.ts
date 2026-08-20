import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  // The Go backend (password_safe_bot) embeds dist/telegram_passwords and
  // serves it under /static/ (gin group), so assets must be rooted there.
  base: '/static/',
  build: {
    outDir: 'dist/telegram_passwords',
    target: 'es2020',
    emptyOutDir: true,
  },
  server: {
    host: true,
    // /api/* is forwarded to the bot backend as-is (no path rewrite).
    proxy: {
      '/api': {
        target: process.env.API_TARGET || 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
