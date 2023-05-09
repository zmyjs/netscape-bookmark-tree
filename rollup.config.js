import terser from '@rollup/plugin-terser';

function getOutput(format, suffix) {
    const file = `bookmark.${suffix}`;

    return {
        format: format,
        file,
        exports: 'named',
        banner: `
/**
 * @file ${file}
 * @name ${process.env.npm_package_name}
 * @version ${process.env.npm_package_version} Build.${Date.now()}
 * @author ZMY
 * @license MIT
 */
                `,
        name: 'bookmark',
    };
}

export default [
    {
        input: 'src/node.js',
        output: [
            getOutput('cjs', 'cjs'),
            getOutput('es', 'js'),
        ],
        external: ['parse5'],
        plugins: [terser()]
    },
    {
        input: 'src/browser.js',
        output: [
            getOutput('iife', 'browser.iife.js'),
            getOutput('es', 'browser.js'),
        ],
        plugins: [terser()]
    }
];