import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
        server: {
            port: 5173, // Vite default
            host: '0.0.0.0',
            proxy: {
                '/api': {
                    target: 'http://localhost:5000',
                    changeOrigin: true,
                    secure: false,
                }
            }
        },
        plugins: [react()],
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                '@admin': path.resolve(__dirname, './src/admin'),
                '@user': path.resolve(__dirname, './src/user'),
                // Fallback if needed, but risky
                // '@': path.resolve(__dirname, './src'), 
            }
        }
    };
});
