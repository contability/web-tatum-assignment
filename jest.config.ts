import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
        },
      },
    ],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@utils/(.*)$': '<rootDir>/src/lib/utils/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
  },
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
