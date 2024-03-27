import { TypeProjectMode } from '@cabloy/module-info';
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

export function getPathsMeta(projectMode: TypeProjectMode): IModuleGlobPathsMeta {
  const suites = __pathSuites.concat([
    {
      prefix: `node_modules/cabloy-suite-${projectMode}-`,
      vendor: true,
      node_modules: true,
    },
  ]);
  const modules = __pathsModules.concat([
    {
      prefix: `node_modules/cabloy-module-${projectMode}-`,
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
