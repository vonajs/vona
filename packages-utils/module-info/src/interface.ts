export type TypeProjectMode = 'front' | 'api' | 'zova' | 'vona';
export type TypeProjectEntityType = 'module' | 'suite';

export interface IModuleCapabilities {
  monkey: boolean;
  sync: boolean;
  icon: boolean;
  theme: boolean;
  locale: boolean;
  preload: boolean;
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
  module?: IModule;
  sceneIsolate?: boolean;
  hasLocal?: boolean;
  optionsNone?: boolean;
  optionsRoute?: boolean;
  optionsArgumentPipe?: boolean;
  optionsDynamic?: boolean;
  optionsGlobalInterfaceName?: string;
  optionsGlobalInterfaceFrom?: string;
  scopeResource?: boolean;
  beanLocal?: boolean;
  boilerplate?: string;
  metadataCustom?: string;
}

export interface OnionMetaMeta {
  module?: IModule;
  scopeResource?: boolean;
  boilerplate?: string;
  metadataCustom?: string;
}

export type OnionScenesMeta = Record<string, OnionSceneMeta>;
export type OnionMetasMeta = Record<string, OnionMetaMeta>;

export interface IModulePackage {
  name: string;
  version: string;
  vonaModule?: {
    capabilities?: IModuleCapabilities;
    fileVersion: number;
    dependencies?: Record<string, string>;
    globalDependencies?: Record<string, string | boolean>;
    onions?: OnionScenesMeta;
    metas?: OnionMetasMeta;
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

export interface IGlobBeanFile {
  file: string;
  fileContent: string;
  fileName: string;
  fileNameJS: string;
  fileNameJSRelative: string;
  className: string;
  beanName: string;
  beanNameFull: string;
  isIgnore: boolean;
  isVirtual: boolean;
}

export interface IMetadataCustomGenerateOptions {
  cli: any;
  sceneName: string;
  sceneNameCapitalize: string;
  sceneMeta: OnionSceneMeta;
  moduleName: string;
  modulePath: string;
  globFiles: IGlobBeanFile[];
}

export type TypeMetadataCustomGenerate = (options: IMetadataCustomGenerateOptions) => Promise<string>;
