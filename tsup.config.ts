import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { defineConfig } from 'tsup';
import { vanillaExtractCssAsRegister } from './vanilla-extract-shadow';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        message: 'src/message/index.ts',
        notice: 'src/notice/index.ts',
        dialog: 'src/dialog/index.ts',
        drawer: 'src/drawer/index.ts',
        backdrop: 'src/backdrop/index.ts'
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    esbuildPlugins: [vanillaExtractCssAsRegister(), vanillaExtractPlugin()]
});
