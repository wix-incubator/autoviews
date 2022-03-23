module.exports = {
    displayName: 'core',
    testEnvironment: 'jsdom',
    transform: {
        '.tsx?$': ['ts-jest', 'babel-jest'],
        '.jsx?$': 'babel-jest'
    },
    setupFiles: [
        `<rootDir>/tests/__jest__/env.ts`
    ],
    setupFilesAfterEnv: [
        `<rootDir>/tests/__jest__/setup.ts`
    ]
};
