export const rules = {
  'prefer-promise-reject-errors': 'off',
  'no-console': 'warn',
  'no-debugger': 'warn',
  'prefer-const': [
    'error',
    {
      destructuring: 'all',
      ignoreReadBeforeAssign: true,
    },
  ],
  'no-undef': [
    'error',
    {
      typeof: false,
    },
  ],
  '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@stylistic/max-len': ['error', {
    code: 130, tabWidth: 2,
    ignoreComments: true,
    ignoreTrailingComments: true,
    ignoreUrls: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
    ignoreRegExpLiterals: true,
  }],
  '@stylistic/arrow-parens': ['error', 'as-needed'],
  '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
  '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
  '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
};
