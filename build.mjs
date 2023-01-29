import esbuild from 'esbuild';
import { dtsPlugin } from 'esbuild-plugin-d.ts';
import rimraf from 'rimraf';

rimraf.sync('dist');

const option = {
    bundle: true,
    color: true,
    logLevel: 'info',
    sourcemap: true,
    entryPoints: ['./src/index.ts'],
    minify: true
};

await esbuild
    .build({
        format: 'esm',
        outdir: 'dist',
        splitting: true,
        plugins: [dtsPlugin()],
        ...option
    })
    .catch(error => {
        throw error;
    });

await esbuild
    .build({
        format: 'cjs',
        outfile: './dist/cjs.js',
        ...option
    })
    .catch(error => {
        throw error;
    });
