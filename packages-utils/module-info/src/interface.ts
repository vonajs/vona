export type TypeProjectMode = 'front' | 'api' | 'zova' | 'vona';
export type TypeProjectEntityType = 'module' | 'suite';

export interface IModuleCapabilities {
  monkey: boolean;
  sync: boolean;
  icon: boolean;
  theme: boolean;
  locale: boolean;
}

export interface IModuleInfo {
  pid: string;
  name: string;
  fullName: string;
  relativeName: string;
  url: string;
  vendor?: boolean;
  node_modules?: boolean;
  originalName: string;
  capabilities?: IModuleCapabilities;
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

export interface IModule extends ISuiteModuleBase {
  suite?: string;
}

export interface IBundleVendor {
  match: Array<string | RegExp>;
  output: string;
}

export interface OnionSceneMeta {
  sceneIsolate?: boolean;
  hasLocal?: boolean;
  optionsRoute?: boolean;
  optionsArgumentPipe?: boolean;
  optionsDynamic?: boolean;
  optionsGlobalInterfaceName?: string;
  optionsGlobalInterfaceFrom?: string;
  scopeResource?: boolean;
  boilerplate?: string;
  metadataCustom?: string;
}

export type OnionScenesMeta = Record<string, OnionSceneMeta>;

export interface IModulePackage {
  name: string;
  version: string;
  vonaModule?: {
    capabilities?: IModuleCapabilities;
    fileVersion: number;
    dependencies?: Record<string, string>;
    globalDependencies?: Record<string, string | boolean>;
    onions?: OnionScenesMeta;
  };
  zovaModule?: {
    capabilities?: IModuleCapabilities;
    dependencies?: Record<string, string>;
    globalDependencies?: Record<string, string | boolean>;
    bundle?: {
      vendors?: Array<IBundleVendor>;
    };
  };
  title: string;
  description: string;
  author: string;
  dependencies: Record<string, string>;
}
