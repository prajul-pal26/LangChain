import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    // Base path - change to '/subpath/' if serving from a subpath
    base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@config': path.resolve(__dirname, '../config.json'),
        },
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    animations: ['framer-motion'],
                },
            },
        },
    },
    server: {
        host: true,
        port: 5173,
        allowedHosts: [
            'generativedge.cloud',
            'www.generativedge.cloud',
            'generativedge.com',
            'www.generativedge.com'
        ],
    },

    preview: {
        host: true,
        port: 5173,
    },
})
