export interface IModuleInfo {
  pid: string;
  name: string;
  fullName: string;
  relativeName: string;
  url?: string;
  sync?: boolean;
  monkey?: boolean;
  vendor?: boolean;
  source?: boolean;
  node_modules?: boolean;
}

export interface ISuite {
  name: string;
  info: IModuleInfo;
  root: string;
  pkg: string;
  package?: IModulePackage;
  modules: string[];
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
