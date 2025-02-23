import type { VonaOnionOptionsMeta } from './vona.ts';
import type { ZovaOnionOptionsMeta } from './zova.ts';

export type TypeProjectMode = 'front' | 'api' | 'zova' | 'vona';
export type TypeProjectEntityType = 'module' | 'suite';
export type TypeBrandName = 'zova' | 'vona';

export interface IOnionsConfigItem {
  enable?: boolean;
  meta?: ZovaOnionOptionsMeta;
  match?: string | string[];
  ignore?: string | string[];
  dependencies?: string | string[];
  dependents?: string | string[];
}
export type TypeOnionsConfigItems = Record<string, IOnionsConfigItem>;
export type TypeOnionsConfig = Record<string, TypeOnionsConfigItems>;

export interface IModuleCapabilities {
  monkey?: boolean;
  sync?: boolean;
  icon?: boolean;
  theme?: boolean;
  locale?: boolean;
  preload?: boolean;
}

export interface IModuleCapabilitiesZova extends IModuleCapabilities {
  meta?: ZovaOnionOptionsMeta;
}

export interface IModuleCapabilitiesVona extends IModuleCapabilities {
  meta?: VonaOnionOptionsMeta;
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
  onionsMeta?: {
    onions?: OnionScenesMeta;
    metas?: OnionMetasMeta;
    onionsConfig?: TypeOnionsConfig;
  };
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
  optionsPackage?: boolean;
  optionsGlobalInterfaceName?: string;
  optionsGlobalInterfaceFrom?: string;
  scopeResource?: boolean;
  beanGeneral?: boolean;
  snippets?: string;
  boilerplate?: string;
  metadataCustom?: string;
}

export interface OnionMetaMeta {
  module?: IModule;
  scopeResource?: boolean;
  snippets?: string;
  boilerplate?: string;
  metadataCustom?: string;
}

export type OnionScenesMeta = Record<string, OnionSceneMeta>;
export type OnionMetasMeta = Record<string, OnionMetaMeta>;

export interface IModulePackage {
  name: string;
  version: string;
  vonaModule?: {
    capabilities?: IModuleCapabilitiesVona;
    fileVersion: number;
    dependencies?: Record<string, string>;
    globalDependencies?: Record<string, string | boolean>;
    globalDependenciesDev?: Record<string, string | boolean>;
    onions?: OnionScenesMeta;
    metas?: OnionMetasMeta;
  };
  zovaModule?: {
    capabilities?: IModuleCapabilitiesZova;
    dependencies?: Record<string, string>;
    globalDependencies?: Record<string, string | boolean>;
    globalDependenciesDev?: Record<string, string | boolean>;
    onions?: OnionScenesMeta;
    metas?: OnionMetasMeta;
    onionsConfig?: TypeOnionsConfig;
    bundle?: {
      vendors?: Array<IBundleVendor>;
    };
  };
  title: string;
  description: string;
  author: string;
  files: string[];
  dependencies: Record<string, string>;
}

export interface IGlobBeanFile {
  sceneName: string;
  sceneNameCapitalize: string;
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
