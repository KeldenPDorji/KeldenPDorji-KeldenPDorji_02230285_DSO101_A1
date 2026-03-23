module.exports = {
    testEnvironment: 'node',
    collectCoverageFrom: ['server.js'],
    reporters: ['default', 'jest-junit'],
    testMatch: ['**/*.test.js'],
    verbose: true
};
