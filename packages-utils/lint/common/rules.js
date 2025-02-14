export const rules = {
  'prefer-promise-reject-errors': 'off',
  'no-console': 'error',
  '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
  '@stylistic/max-len': ['error', { code: 130, tabWidth: 2 }],
  '@stylistic/arrow-parens': ['error', 'as-needed'],
  '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
  '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
  '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
};
