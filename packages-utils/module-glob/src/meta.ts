export const __pathSuites = [
  {
    prefix: 'src/suite/',
    vendor: false,
  },
  {
    prefix: 'src/suite-vendor/',
    vendor: true,
  },
];

export const __pathsModules = [
  {
    prefix: 'src/module/',
    vendor: false,
    public: false,
    fronts: [{ js: 'front/src/main.js' }, { js: 'dist/front.js' }],
  },
  {
    prefix: 'src/module-system/',
    vendor: false,
    public: false,
    fronts: [{ js: 'front/src/main.js' }, { js: 'dist/front.js' }],
  },
  {
    prefix: 'src/suite/*/modules/',
    vendor: false,
    public: false,
    fronts: [{ js: 'front/src/main.js' }, { js: 'dist/front.js' }],
  },
  {
    prefix: 'src/module-vendor/',
    vendor: true,
    public: false,
    fronts: [{ js: 'dist/front.js' }, { js: 'front/src/main.js' }],
  },
  {
    prefix: 'src/suite-vendor/*/modules/',
    vendor: true,
    public: false,
    fronts: [{ js: 'dist/front.js' }, { js: 'front/src/main.js' }],
  },
  {
    prefix: 'node_modules/cabloy-module-api-',
    vendor: true,
    public: true,
    node_modules: true,
    fronts: [{ js: 'dist/front.js' }, { js: 'front/src/main.js' }],
  },
];
