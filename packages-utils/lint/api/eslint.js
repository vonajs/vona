const rules = require('../common/rules.js');

module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
  },
  rules,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    // $: true,
    // util: true,
    // env: true,
    // App: true,
    // getApp: true,
    // Page: true,
    // wx: true,
    // define: true,
    Proxy: true,
  },
};
