import path from 'node:path';
import url from 'node:url';
import { defineConfig } from 'vite';
import { cssAsText } from './vite.css-text';

export default defineConfig({
    plugins: [cssAsText()],
    resolve: {
        alias: {
            '@': path.resolve(
                path.dirname(url.fileURLToPath(import.meta.url)),
                './src'
            )
        }
    }
});
