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
  'array-bracket-spacing': ['error', 'never'],
  'no-empty': [
    'error',
    {
      allowEmptyCatch: true,
    },
  ],
  'no-empty-function': [
    'error',
    {
      allow: [
        'functions',
        'arrowFunctions',
        'generatorFunctions',
        'methods',
        'generatorMethods',
        'getters',
        'setters',
        'constructors',
        'asyncFunctions',
        'asyncMethods',
      ],
    },
  ],
  'no-constant-condition': [
    'error',
    {
      checkLoops: false,
    },
  ],
  'one-var-declaration-per-line': [0],
  'space-before-function-paren': [0],
  'generator-star-spacing': [0],
  'newline-per-chained-call': [0],
  'prefer-rest-params': 'off',
  // 'no-setter-return': 'off', // no effect for typescript check
  '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
  '@typescript-eslint/no-this-alias': 'off',
  '@typescript-eslint/no-unsafe-declaration-merging': 'off',
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': 'allow-with-description',
    },
  ],
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-unsafe-function-type': 'off',
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
  '@stylistic/keyword-spacing': ['error', { overrides: {
    this: { before: true },
  } }],
};
