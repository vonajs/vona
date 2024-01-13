export interface IModuleInfo {
  pid: string;
  name: string;
  fullName: string;
  relativeName: string;
  url?: string;
  sync?: boolean;
  monkey?: boolean;
  vendor?: boolean;
  public?: boolean;
  node_modules?: boolean;
}

export interface IModuleGlobOptions {
  projectPath: string;
  disabledModules?: string[];
  disabledSuites?: string[];
  log?: boolean;
  type: 'front' | 'backend';
}

export interface IModuleGlobContext {
  options: IModuleGlobOptions;
  suites: Record<string, ISuite>;
  modules: Record<string, IModule>;
  modulesArray: IModule[];
  modulesLast: IModule[];
  //
  modulesLocal: Record<string, IModule>;
  modulesGlobal: Record<string, IModule>;
  modulesMonkey: Record<string, IModule>;
  //
  suitesLocal: Record<string, ISuite>;
  suitesVendor: Record<string, ISuite>;
  //
  disabledModules: Record<string, boolean>;
  disabledSuites: Record<string, boolean>;
}

export interface ISuite {
  name: string;
  info: IModuleInfo;
  root: string;
  pkg: string;
  package: IModulePackage;
}

export interface IModule {
  name: string;
  info: IModuleInfo;
  root: string;
  pkg: string;
  package: IModulePackage;
}

export interface IModulePackage {
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
