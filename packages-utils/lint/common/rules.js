const rules = {
  'prettier/prettier': ['error', { singleQuote: true }],
  'prefer-promise-reject-errors': 'off',
  quotes: ['error', 'single', { avoidEscape: true }],
  '@typescript-eslint/quotes': [
    'error',
    'single',
    {
      avoidEscape: true,
    },
  ],
  // this rule, if on, would require explicit return type on the `render` function
  '@typescript-eslint/explicit-function-return-type': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/prefer-import-from-vue': 'off',
  '@typescript-eslint/no-namespace': 'off',

  '@typescript-eslint/no-explicit-any': 'off',
  'prefer-const': [
    'error',
    {
      destructuring: 'all',
      ignoreReadBeforeAssign: true,
    },
  ],
  'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'max-len': [
    'error',
    {
      code: 120,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
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
  'vue/multi-word-component-names': [0],
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
  '@typescript-eslint/ban-types': [
    'error',
    {
      types: {
        // un-ban a type that's banned by default
        '{}': false,
        Function: false,
      },
      extendDefaults: true,
    },
  ],
  'prefer-rest-params': 'off',
  // 'no-setter-return': 'off', // no effect for typescript check
};

module.exports = rules;
