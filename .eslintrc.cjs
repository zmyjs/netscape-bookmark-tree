module.exports = {
    root: true,
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 1 }]
    },
};