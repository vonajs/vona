import { IModuleGlobPathMetaItem, IModuleGlobPathsMeta } from './interface.js';

const __pathSuites: IModuleGlobPathMetaItem[] = [
  {
    prefix: 'src/suite/',
    vendor: false,
  },
  {
    prefix: 'src/suite-vendor/',
    vendor: true,
  },
];

const __pathsModules: IModuleGlobPathMetaItem[] = [
  {
    prefix: 'src/module/',
    vendor: false,
  },
  {
    prefix: 'src/suite/*/modules/',
    vendor: false,
  },
  {
    prefix: 'src/module-vendor/',
    vendor: true,
  },
  {
    prefix: 'src/suite-vendor/*/modules/',
    vendor: true,
  },
];

export function getPathsMeta(type): IModuleGlobPathsMeta {
  const suites = __pathSuites.concat([
    {
      prefix: type === 'backend' ? 'node_modules/cabloy-suite-api-' : 'node_modules/cabloy-suite-front-',
      vendor: true,
      node_modules: true,
    },
  ]);
  const modules = __pathsModules.concat([
    {
      prefix: type === 'backend' ? 'node_modules/cabloy-module-api-' : 'node_modules/cabloy-module-front-',
      vendor: true,
      node_modules: true,
    },
  ]);
  const pathsMeta = {
    suites,
    modules,
  };
  return pathsMeta;
}
