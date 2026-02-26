import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/AI-windows-whl/',
  plugins: [
    react(),
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
