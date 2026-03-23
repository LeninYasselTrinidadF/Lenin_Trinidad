// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://LeninYasselTrinidadF.github.io',
  base: '/Lenin_Trinidad',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
