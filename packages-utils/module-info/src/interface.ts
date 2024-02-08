export interface IModuleInfo {
  pid: string;
  name: string;
  fullName: string;
  relativeName: string;
  url: string;
  sync?: boolean;
  monkey?: boolean;
  vendor?: boolean;
  source?: boolean;
  node_modules?: boolean;
  originalName: string;
}

export interface ISuiteModuleBase {
  name: string;
  info: IModuleInfo;
  root: string;
  pkg: string;
  package: IModulePackage;
}
export interface ISuite extends ISuiteModuleBase {
  modules: string[];
}

export interface IModule extends ISuiteModuleBase {}

export interface IModulePackage {
  name: string;
  version: string;
  eggBornModule: {
    fileVersion: number;
    dependencies: Record<string, string>;
    theme: object;
    icon: string;
    locale: string;
  };
  title: string;
  description: string;
  author: string;
  dependencies: string;
}
