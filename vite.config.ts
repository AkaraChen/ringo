import { defineConfig } from 'vite';
import path from 'node:path';
import url from 'node:url';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(
                path.dirname(url.fileURLToPath(import.meta.url)),
                './src'
            )
        }
    }
});
