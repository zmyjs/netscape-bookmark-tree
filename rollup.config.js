import { version } from './package.json';
import { terser } from 'rollup-plugin-terser';

const banner = `/**
 * netscape-bookmark-tree v${version}
 * Build ${Date.now()}
 * Zhu MaoYan
 */
`;

const config = {
    input: 'src/index.js',
    output: [
        {
            format: 'esm',
        },
        {
            format: 'cjs',
        },
        {
            format: 'amd',
        },
        {
            format: 'system',
        },
        {
            name: 'bookmark',
            format: 'iife',
        }
    ],
    // plugins: [terser()]
};

config.output.forEach(function (v) {
    v.banner = banner;
    v.file = `dist/bookmark.${v.format}.js`;
});

export default config;