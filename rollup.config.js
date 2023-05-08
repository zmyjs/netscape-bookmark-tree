import terser from '@rollup/plugin-terser';

function getDist(type) {
    return `dist/bookmark.${type}`;
}

export default [
    {
        input: 'src/node.js',
        output: [
            {
                format: 'cjs',
                file: getDist('cjs')
            },
            {
                format: 'es',
                file: getDist('js')
            },
        ],
        external: ['parse5'],
        plugins: [terser()]
    },
    {
        input: 'src/browser.js',
        output: [
            {
                name: 'bookmark',
                format: 'iife',
                file: getDist('browser.iife.js'),
            },
            {
                format: 'es',
                file: getDist('browser.js'),
            },
        ],
        plugins: [terser()]
    }
];