import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import { version } from './package.json';

const banner = `/**
 * netscape-bookmark-tree v${version}
 * Build ${Date.now()}
 * Zhu MaoYan
 */
`;

const input = {
    reg: 'src/regMode.js',
    ast: 'src/astMode.js'
};

const config = [];

function getDist(type) {
    return `dist/bookmark.${type}.js`;
}

const pluginBabel = babel({ exclude: 'node_modules/**' }),
    pluginMinify = minify({ comments: false, banner });


// reg模式
config.push({
    input: input.reg,
    output: {
        name: 'bookmark',
        format: 'umd',
        file: getDist('umd'),
    },
    plugins: [
        pluginBabel,
        pluginMinify
    ]
});

config.push({
    input: input.reg,
    output: {
        format: 'esm',
        file: getDist('esm'),
    },
    plugins: [
        pluginMinify
    ]
});


// ast模式
config.push({
    input: input.ast,
    output: {
        format: 'cjs',
        file: getDist('ast.cjs'),
    },
    plugins: [
        pluginBabel,
        pluginMinify
    ]
});

config.push({
    input: input.ast,
    output: {
        format: 'esm',
        file: getDist('ast.esm'),
    },
    plugins: [
        pluginMinify
    ]
});

export default config;