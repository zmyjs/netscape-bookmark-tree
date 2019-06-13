import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { version } from './package.json';

const banner = `/**
 * netscape-bookmark-tree v${version}
 * Build ${Date.now()}
 * Zhu MaoYan
 */
`;

const regConfig = {
    input: 'src/reg.js',
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
            name: 'bookmark',
            format: 'iife',
        }
    ],
    plugins: [
        babel({ exclude: 'node_modules/**' }),
        terser()
    ]

};

regConfig.output.forEach(function (v) {
    v.banner = banner;
    v.file = `dist/bookmark.${v.format}.js`;
});

const astConfig = {
    input: 'src/ast.js',
    output: [
        {
            format: 'esm',
        },
        {
            format: 'cjs',
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({ exclude: 'node_modules/**' }),
        terser()
    ]
};

astConfig.output.forEach(function (v) {
    v.banner = banner;
    v.file = `dist/bookmark.ast.${v.format}.js`;
});

export default [regConfig, astConfig];