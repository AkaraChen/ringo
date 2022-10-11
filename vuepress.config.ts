import {defineUserConfig} from 'vuepress';
import {registerComponentsPlugin} from '@vuepress/plugin-register-components';
import {resolve} from 'path';
import {defaultTheme} from 'vuepress';

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'Ringo.js',
    description: 'Pop-up component written in Pure TypeScript.',
    plugins: [
        registerComponentsPlugin({
            componentsDir: resolve(__dirname, './docs', './demo'),
        }),
    ],
    theme: defaultTheme({
        navbar: [{text: 'Github', link: 'https://github.com/akarachen/ringo'}],
        sidebar: [
            {text: 'Get Started', link: '/'},
            {text: 'Message', link: '/message'},
            {text: 'Notice', link: '/notice'},
        ],
    }),
});
