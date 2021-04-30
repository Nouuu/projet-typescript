module.exports = {
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  testEnvironment: 'node',
  testMatch: ['**/tests/*.test.ts']
};
