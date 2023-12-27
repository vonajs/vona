// 2023-12-27
const eslintConfigEggBorn = require.resolve('./packages/eslint-config-egg-born/api.js');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [eslintConfigEggBorn],
};
