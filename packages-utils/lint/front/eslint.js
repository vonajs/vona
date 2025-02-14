import stylistic from '@stylistic/eslint-plugin';
import vueParser from 'vue-eslint-parser';
import parserTs from '@typescript-eslint/parser';
import eslintVue from 'eslint-plugin-vue';

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
    },
  },
];
