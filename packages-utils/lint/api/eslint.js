import stylistic from '@stylistic/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import { rules } from '../common/rules.js';

export default [
  ...tseslint.configs.recommended,
  stylistic.configs.customize({
    flat: true,
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
      globals: {
        console: 'readonly',
        process: 'readonly',
        describe: 'readonly',
        it: 'readonly',
      },
    },
    rules,
  },
];
