import {defineConfig} from 'vitepress';

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
                ],
            },
        ],
    },
});
