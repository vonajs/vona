import stylistic from '@stylistic/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import { rules } from '../common/rules.js';

export default [
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
  }),
  {
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
        ecmaVersion: 'latest',
        useJSXTextNode: true,
        sourceType: 'module',
      },
    },
    rules,
  },
];
