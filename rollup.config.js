import { version } from './package.json';

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
            format: 'es',
        },
        {
            format: 'cjs',
        },
        {
            format: 'amd',
        },
        {
            name: 'bookmark',
            format: 'iife',
        }
    ]
};

config.output.forEach(function (v) {
    v.banner = banner;
    v.file = `dist/netscape-bookmark-tree.${v.format}.js`;
});

export default config;