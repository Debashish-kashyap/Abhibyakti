module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};