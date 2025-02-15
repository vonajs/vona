import EslintConfigs from '@cabloy/lint/api/eslint.js';

export default [
  ...EslintConfigs,
  {
    ignores: [
      '**/*.d.ts',
      '**/node_modules/**',
      '**/dist/**',
      '**/static/**',
      '.assets',
      'coverage',
      'docker-compose',
      'scripts',
      'packages-egg-born',
    ],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
  },
];
