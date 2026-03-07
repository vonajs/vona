import EslintConfig from '@cabloy/lint/api/eslint.js';

export default EslintConfig({
  ignores: [
    '**/*.md',
    '**/*.d.ts',
    '**/node_modules/**',
    '**/dist/**',
    '**/static/**',
    '.vona',
    '.assets',
    'coverage',
    'docker-compose',
    'package.json',
    'scripts',
  ],
});
