import antfu from '@antfu/eslint-config';
import globals from 'globals';
import { rules } from '../common/rules.js';
import { rulesVue } from '../common/rulesVue.js';

export default function eslintConfig(config, ...args) {
  config = Object.assign({
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
      jsx: true,
    },
    typescript: true,
    vue: true,
    gitignore: false,
  }, config);
  return antfu(config, {
    files: ['**/*.ts', '**/*.tsx'],
    rules,
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  }, {
    files: ['**/*.vue'],
    rules: Object.assign({}, rules, rulesVue),
    languageOptions: {
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
      },
    },
  }, ...args);
}

// export default [
//   ...tseslint.configs.recommended,
//   ...eslintVue.configs['flat/recommended'],
//   stylistic.configs.customize({
//     indent: 2,
//     quotes: 'single',
//     semi: true,
//     jsx: true,
//   }),
//   {
//     languageOptions: {
//       parser: vueParser,
//       parserOptions: {
//         extraFileExtensions: ['.vue'],
//         ecmaFeatures: {
//           jsx: true,
//           tsx: true,
//         },
//         ecmaVersion: 'latest',
//         useJSXTextNode: true,
//         sourceType: 'module',
//         parser: parserTs,
//       },
//       globals: {
//         ...globals.browser,
//         ...globals.jest,
//         ga: 'readonly', // Google Analytics
//         cordova: 'readonly',
//         __statics: 'readonly',
//         __QUASAR_SSR__: 'readonly',
//         __QUASAR_SSR_SERVER__: 'readonly',
//         __QUASAR_SSR_CLIENT__: 'readonly',
//         __QUASAR_SSR_PWA__: 'readonly',
//         process: 'readonly',
//         Capacitor: 'readonly',
//         chrome: 'readonly',
//         // $: true,
//         // util: true,
//         // env: true,
//         // App: true,
//         // getApp: true,
//         // Page: true,
//         // wx: true,
//         // define: true,
//         Proxy: true,
//       },
//     },
//     rules: Object.assign({}, rules, rulesVue),
//   },
//   {
//     plugins: {
//       json,
//     },
//     files: ['**/*.json'],
//     language: 'json/json',
//     rules: {
//       'json/no-duplicate-keys': 'error',
//     },
//   },
// ];
