import { defineConfig } from 'vitest/config';
import { cssAsText } from './vite.css-text';

export default defineConfig({
    plugins: [cssAsText()],
    test: {
        environment: 'happy-dom',
        include: ['tests/**/*.test.ts']
    }
});
