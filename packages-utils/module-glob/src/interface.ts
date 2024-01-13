import { IModuleParseInfo } from '@cabloy/module-parse';

export interface IModuleGlobOptions {
  projectPath: string;
  disabledModules?: string[];
  disabledSuites?: string[];
  log?: boolean;
  type: 'front' | 'backend';
}

export interface IModuleGlobContext {
  options: IModuleGlobOptions;
  suites: Record<string, IAppSuite>;
  modules: Record<string, IAppModule>;
  modulesArray;
  modulesLast;
  //
  modulesLocal;
  modulesGlobal;
  modulesMonkey;
  //
  suitesLocal;
  suitesVendor;
  //
  disabledModules;
  disabledSuites;
}

export interface IAppSuite {
  name: string;
  info: IModuleParseInfo;
  root: string;
  pkg: string;
  package: IAppModulePackage;
}

export interface IAppModule {
  name: string;
  info: IModuleParseInfo;
  root: string;
  pkg: string;
  package: IAppModulePackage;
}

export interface IAppModulePackage {
  name: string;
  version: string;
  eggBornModule: {
    fileVersion: number;
    dependencies: Record<string, string>;
  };
  description: string;
  author: string;
  dependencies: string;
}
