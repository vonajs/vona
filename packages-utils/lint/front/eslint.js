import stylistic from '@stylistic/eslint-plugin';
import vueParser from 'vue-eslint-parser';
import parserTs from '@typescript-eslint/parser';
import eslintVue from 'eslint-plugin-vue';
import rules from '../common/rules.js';

export default [
  ...eslintVue.configs['flat/recommended'],
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
  }),
  {
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
        ecmaVersion: 'latest',
        useJSXTextNode: true,
        sourceType: 'module',
        parser: parserTs,
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
    },
    rules,
  },
];
