module.exports = {
    projects: ['packages/*/jest.config.js'],
    testMatch: ['**/*.test.ts?(x)'],
    globals: {
        'ts-jest': {
            diagnostics: {
                warnOnly: true
            }
        }
    }
};
