import path from 'node:path';
import url from 'node:url';
import { defineConfig } from 'vite';
import { vanillaExtractShadowVite } from './vanilla-extract-shadow';

export default defineConfig({
    plugins: [vanillaExtractShadowVite()],
    resolve: {
        alias: {
            '@': path.resolve(
                path.dirname(url.fileURLToPath(import.meta.url)),
                './src'
            )
        }
    }
});
