const eslintConfigEggBorn = require.resolve('./packages/egg-born-lint-config/api/eslint.js');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [eslintConfigEggBorn],
};
