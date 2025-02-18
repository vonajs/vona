import EslintConfig from '@cabloy/lint/api/eslint.js';

export default EslintConfig({
  ignores: [
    '**/*.d.ts',
    '**/node_modules/**',
    '**/dist/**',
    '**/static/**',
    '.assets',
    'coverage',
    'docker-compose',
    'package.json',
    'scripts',
    'packages-egg-born',
  ],
});
