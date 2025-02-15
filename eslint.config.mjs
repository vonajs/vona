import EslintConfigs from '@cabloy/lint/api/eslint.js';

export default [
  ...EslintConfigs,
  {
    ignores: [
      '**/*.d.ts',
      '**/node_modules/**',
      '**/dist/**',
      '**/static/**',
      'coverage',
      'docker-compose',
      'scripts',
    ],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
  },
];
