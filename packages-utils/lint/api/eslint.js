import stylistic from '@stylistic/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

export default [
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
  }),
  {
    languageOptions: {
      parserOptions: {
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
