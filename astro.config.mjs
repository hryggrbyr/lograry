import { defineConfig } from 'astro/config';
import node from '@astrojs/node'; // or vercel/netlify adapter

export default defineConfig({
  output: 'server', // or 'hybrid'
  adapter: node({
    mode: 'standalone',
  }),
});
