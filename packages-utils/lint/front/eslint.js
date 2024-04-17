const rules = require('../common/rules.js');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended','plugin:vue/vue3-essential', 'prettier'],
  plugins: ['@typescript-eslint','vue'],
  parserOptions: {
    extraFileExtensions: ['.vue'],
  },
  rules,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly',
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
