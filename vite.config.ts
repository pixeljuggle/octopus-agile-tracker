import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';

const pwaManifest: Partial<ManifestOptions> = {
  name: 'Octopus Agile Tracker',
  short_name: 'Octopus Agile Tracker',
  description: 'View current incoming Octopus Energy Agile rates and consumption',
  theme_color: '#1B154A',
  background_color: '#1B154A',
  display: 'standalone',
  orientation: 'portrait',
  start_url: '.',
  lang: 'en-GB',
  icons: [
    {
      src: './images/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png',
    },
    {
      src: './images/icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      src: './images/icons/icon-128x128.png',
      sizes: '128x128',
      type: 'image/png',
    },
    {
      src: './images/icons/icon-152x152.png',
      sizes: '152x152',
      type: 'image/png',
    },
    {
      src: './images/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: './images/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: pwaManifest,
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
