import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
  base: '/AI-windows-whl/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json}'],
        runtimeCaching: [
          {
            urlPattern: /wheels\.json/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'wheels-data',
              expiration: { maxEntries: 1, maxAgeSeconds: 86400 },
            },
          },
          {
            urlPattern: /version\.txt/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'version-data',
              expiration: { maxEntries: 1, maxAgeSeconds: 3600 },
            },
          },
        ],
      },
      manifest: {
        name: 'Windows AI Wheels',
        short_name: 'AI Wheels',
        description: 'Browse pre-compiled Python wheels for Windows AI/ML',
        theme_color: '#0a0a0f',
        background_color: '#0a0a0f',
        display: 'standalone',
        icons: [{ src: '/AI-windows-whl/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
    }),
    // Handle inline styles in HTML for Vite 7 compatibility
    {
      name: 'html-inline-css-workaround',
      enforce: 'pre',
      resolveId(id) {
        // Intercept HTML proxy CSS requests
        if (id.includes('html-proxy') && id.includes('inline-css')) {
          return { id, external: false };
        }
        return null;
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
        // SEO-friendly asset naming
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          if (info.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          if (info.match(/\.(png|jpe?g|gif|svg|webp)$/)) {
            return 'images/[name]-[hash][extname]';
          }
          if (info.match(/\.(woff2?|ttf|otf|eot)$/)) {
            return 'fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Optimize chunk size for better loading performance
    chunkSizeWarningLimit: 1000,
    // Enable brotli compression
    reportCompressedSize: true,
    // Target modern browsers for smaller bundles
    target: 'es2020',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  // Server configuration for development
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  // Preview server
  preview: {
    port: 4173,
    open: true,
  },
  // CSS configuration
  css: {
    devSourcemap: true,
    postcss: './postcss.config.cjs',
  },
  // Performance optimizations
  esbuild: {
    target: 'es2020',
    legalComments: 'none',
    minifyWhitespace: true,
  },
});
