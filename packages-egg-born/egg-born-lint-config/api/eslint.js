const rules = {
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
  'space-before-function-paren': [
    'error',
    {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    },
  ],
  'generator-star-spacing': [0],
  'newline-per-chained-call': [0],
  'vue/multi-word-component-names': [0],
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
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
};

module.exports = {
  extends: 'eslint-config-egg/typescript',
  parserOptions: {},
  rules,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    $: true,
    util: true,
    env: true,
    App: true,
    getApp: true,
    Page: true,
    wx: true,
    define: true,
  },
};
