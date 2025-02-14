import EslintConfigs from '@cabloy/lint/api/eslint.js';

export default [
  ...EslintConfigs,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      '**/*.d.ts', 
      'node_modules',
      'dist',
    ],
  },
];
