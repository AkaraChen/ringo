import { defineConfig } from 'vitepress';
import path from 'node:path';
import url from 'node:url'

export default defineConfig({
    title: 'Ringo.js',
    description: 'Pop-up component written in Pure TypeScript.',
    themeConfig: {
        nav: [{text: 'Github', link: 'https://github.com/akarachen/ringo'}],
        sidebar: [
            {
                text: 'Index',
                items: [
                    {text: 'Get Started', link: '/'},
                    {text: 'Message', link: '/message'},
                    {text: 'Notice', link: '/notice'},
                    {text: 'Backdrop', link: '/backdrop'},
                    {text: 'Drawer', link: '/drawer'},
                    {text: 'Dialog', link: '/dialog'},
                ],
            },
        ],
    },
    vite: {
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
