module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/*.test.ts?(x)'],
    transform: {
        '.tsx?$': ['ts-jest', 'babel-jest'],
        '.jsx?$': 'babel-jest'
    },
    setupFiles: [
        '<rootDir>/tests/__jest__/env.ts'
    ],
    setupFilesAfterEnv: [
        '<rootDir>/tests/__jest__/setup.ts'
    ],
    globals: {
        'ts-jest': {
            diagnostics: {
                warnOnly: true
            }
        }
    }
};
