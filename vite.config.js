import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // loadEnv(mode, process.cwd()) 會讀取 .env, .env.local, .env.[mode], .env.[mode].local
    // 並將讀取到的環境變數寫入 process.env
    // 例如 .env.local 中有 VITE_HTTPS_KEY=xxx，則 process.env.VITE_HTTPS_KEY = xxx
    // 這樣就可以在 vite.config.js 中使用 process.env.VITE_HTTPS_KEY
    // 這邊的 process.cwd() 是 vite.config.js 的路徑
    // 也就是 vite.config.js 所在的資料夾路徑
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
            extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
        },
        // 啟用 https
        server: {
            https: {
                key: fs.readFileSync(process.env.VITE_HTTPS_KEY),
                cert: fs.readFileSync(process.env.VITE_HTTPS_CERT),
            },
        },
        css: {
            preprocessorOptions: {
                less: {
                    math: 'always',
                    relativeUrls: true,
                    javascriptEnabled: true,
                },
            },
        },
    };
});
