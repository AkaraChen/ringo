import path from 'node:path';
import url from 'node:url';
import { defineConfig } from 'vitepress';
import { vanillaExtractShadowVite } from '../../vanilla-extract-shadow';

export default defineConfig({
    title: 'Ringo.js',
    description: 'Popup primitives as Web Components, with an imperative API.',
    themeConfig: {
        nav: [{ text: 'Github', link: 'https://github.com/akarachen/ringo' }],
        sidebar: [
            {
                text: 'Index',
                items: [
                    { text: 'Get Started', link: '/' },
                    { text: 'Message', link: '/message' },
                    { text: 'Notice', link: '/notice' },
                    { text: 'Backdrop', link: '/backdrop' },
                    { text: 'Drawer', link: '/drawer' },
                    { text: 'Dialog', link: '/dialog' }
                ]
            }
        ]
    },
    vite: {
        plugins: [vanillaExtractShadowVite()],
        resolve: {
            alias: {
                '@': path.resolve(
                    path.dirname(url.fileURLToPath(import.meta.url)),
                    '../../src'
                )
            }
        }
    }
});
