const rules = {
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
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended','plugin:vue/vue3-essential', 'prettier'],
  plugins: ['@typescript-eslint','vue'],
  parserOptions: {
    extraFileExtensions: ['.vue'],
  },
  rules,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
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
    // $: true,
    // util: true,
    // env: true,
    // App: true,
    // getApp: true,
    // Page: true,
    // wx: true,
    // define: true,
    Proxy: true,
  },
};
