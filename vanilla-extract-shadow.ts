import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    compile,
    cssFileFilter,
    getSourceFromVirtualCssFile,
    processVanillaFile,
    virtualCssFileFilter
} from '@vanilla-extract/integration';
import type { Plugin as VitePlugin } from 'vite';

const registerPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    'src/core/ve-register.ts'
);

function registerModule(fileName: string, css: string, specifier: string) {
    return `import { registerVanillaCss } from ${JSON.stringify(specifier)};
registerVanillaCss(${JSON.stringify(fileName)}, ${JSON.stringify(css)});
`;
}

/** Intercepts vanilla-extract virtual CSS so it can be adopted into Shadow DOM. */
export function vanillaExtractCssAsRegister() {
    return {
        name: 'vanilla-extract-css-as-register',
        setup(build: {
            onResolve: (
                options: { filter: RegExp },
                callback: (args: { path: string }) => {
                    path: string;
                    namespace: string;
                }
            ) => void;
            onLoad: (
                options: { filter: RegExp; namespace?: string },
                callback: (args: { path: string }) => Promise<{
                    contents: string;
                    loader: 'js';
                    resolveDir?: string;
                }>
            ) => void;
        }) {
            build.onResolve({ filter: virtualCssFileFilter }, (args) => ({
                path: args.path,
                namespace: 'vanilla-extract-css-ns'
            }));

            build.onLoad(
                { filter: /.*/, namespace: 'vanilla-extract-css-ns' },
                async ({ path: filePath }) => {
                    const { source, fileName } =
                        await getSourceFromVirtualCssFile(filePath);
                    return {
                        contents: registerModule(
                            fileName,
                            source,
                            './ve-register'
                        ),
                        loader: 'js',
                        resolveDir: path.dirname(registerPath)
                    };
                }
            );
        }
    };
}

const virtualToOriginal = new Map<string, string>();
const originalToVirtual = new Map<string, string>();
let virtualSeq = 0;

function virtualIdFor(original: string) {
    const existing = originalToVirtual.get(original);
    if (existing) return existing;
    const virtualId = `\0virtual:vanilla-extract-register/${virtualSeq++}.js`;
    originalToVirtual.set(original, virtualId);
    virtualToOriginal.set(virtualId, original);
    virtualToOriginal.set(virtualId.slice(1), original);
    return virtualId;
}

export function vanillaExtractShadowVite(): VitePlugin {
    const identOption =
        process.env.NODE_ENV === 'production' ? 'short' : 'debug';

    return {
        name: 'vanilla-extract-shadow-css',
        enforce: 'pre',
        async resolveId(id) {
            if (virtualCssFileFilter.test(id)) {
                // Must not look like a .css file — Vite 5 still runs
                // PostCSS on any resolved id that ends in .css.
                return virtualIdFor(id);
            }
            if (
                id === 'virtual:vanilla-extract-register' ||
                id.startsWith('virtual:vanilla-extract-register/')
            ) {
                return id.startsWith('\0') ? id : `\0${id}`;
            }
        },
        async load(id) {
            const original = virtualToOriginal.get(id);
            if (!original) return;
            const { source, fileName } =
                await getSourceFromVirtualCssFile(original);
            return registerModule(fileName, source, registerPath);
        },
        async transform(_code, id) {
            const filePath = id.split('?')[0];
            if (!cssFileFilter.test(filePath)) return;
            const { source, watchFiles } = await compile({
                filePath,
                cwd: process.cwd(),
                identOption
            });
            const contents = await processVanillaFile({
                source,
                filePath,
                identOption
            });
            for (const file of watchFiles) this.addWatchFile(file);
            return { code: contents, map: null };
        }
    };
}
