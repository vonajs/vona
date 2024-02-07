"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__pathsModules = exports.__pathSuites = void 0;
exports.__pathSuites = [
    {
        prefix: 'src/suite/',
        vendor: false,
    },
    {
        prefix: 'src/suite-vendor/',
        vendor: true,
    },
    {
        prefix: 'node_modules/cabloy-suite-api-',
        vendor: true,
        node_modules: true,
    },
];
exports.__pathsModules = [
    {
        prefix: 'src/module/',
        vendor: false,
        source: true,
        fronts: [{ js: 'front/src/main.js' }, { js: 'dist/front.js' }],
    },
    {
        prefix: 'src/module-system/',
        vendor: false,
        source: true,
        fronts: [{ js: 'front/src/main.js' }, { js: 'dist/front.js' }],
    },
    {
        prefix: 'src/suite/*/modules/',
        vendor: false,
        source: true,
        fronts: [{ js: 'front/src/main.js' }, { js: 'dist/front.js' }],
    },
    {
        prefix: 'src/module-vendor/',
        vendor: true,
        source: false,
        fronts: [{ js: 'dist/front.js' }, { js: 'front/src/main.js' }],
    },
    {
        prefix: 'src/suite-vendor/*/modules/',
        vendor: true,
        source: false,
        fronts: [{ js: 'dist/front.js' }, { js: 'front/src/main.js' }],
    },
    {
        prefix: 'node_modules/cabloy-module-api-',
        vendor: true,
        source: false,
        node_modules: true,
        fronts: [{ js: 'dist/front.js' }, { js: 'front/src/main.js' }],
    },
];
//# sourceMappingURL=meta.js.map