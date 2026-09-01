import { defineConfig } from 'vitest/config';
import { vanillaExtractShadowVite } from './vanilla-extract-shadow';

export default defineConfig({
    plugins: [vanillaExtractShadowVite()],
    test: {
        environment: 'happy-dom',
        include: ['tests/**/*.test.ts']
    }
});
