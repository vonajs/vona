// 2022-04-28
const config = require('egg-born-lint-config/api/eslint.js');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [config],
};
