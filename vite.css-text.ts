import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

const styleRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    'style'
);

export function cssAsText(): Plugin {
    return {
        name: 'css-as-text',
        enforce: 'pre',
        load(id) {
            const file = id.split('?')[0];
            if (file.endsWith('.css') && file.startsWith(styleRoot)) {
                return `export default ${JSON.stringify(fs.readFileSync(file, 'utf8'))}`;
            }
        }
    };
}
