const banner = `/**
 * netscape-bookmark-tree
 */`;

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/es.js',
            format: 'es',
            banner,
        },
        {
            file: 'dist/cjs.js',
            format: 'cjs',
            banner,
        },
        {
            file: 'dist/amd.js',
            format: 'amd',
            banner,
        },
        {
            name: 'bookmark',
            file: 'dist/iife.js',
            format: 'iife',
            banner,
        }
    ]
};