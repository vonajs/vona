import EslintConfigs from '@cabloy/lint/api/eslint.js';

export default [
  ...EslintConfigs,
  {
      files: ['**/*.ts', '**/*.tsx'],
      ignores: [
        'node_modules',
        'dist',
      ],
  }
]