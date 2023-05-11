module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
    },
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 1 }]
    }
};