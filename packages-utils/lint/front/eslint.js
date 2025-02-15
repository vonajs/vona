import stylistic from '@stylistic/eslint-plugin';
import vueParser from 'vue-eslint-parser';
import parserTs from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import eslintVue from 'eslint-plugin-vue';
import globals from 'globals';
import { rules } from '../common/rules.js';
import { rulesVue } from '../common/rulesVue.js';

export default [
  ...tseslint.configs.recommended,
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
        ...globals.browser,
        ...globals.jest,
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
    rules: Object.assign({}, rules, rulesVue),
  },
];
