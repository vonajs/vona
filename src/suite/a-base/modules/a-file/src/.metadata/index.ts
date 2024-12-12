/** beans: begin */
export * from '../bean/bean.file.js';
export * from '../bean/version.manager.js';
import { BeanFile } from '../bean/bean.file.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    file: BeanFile;
  }

  export interface IBeanRecordGeneral {
    'a-file.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-file' {
  export interface BeanFile {
    get scope(): ScopeModuleAFile;
  }

  export interface VersionManager {
    get scope(): ScopeModuleAFile;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/file.js';
export * from '../entity/fileView.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-file:file': IDecoratorEntityOptions;
    'a-file:fileView': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-file' {}
/** entity: end */
/** model: begin */
export * from '../model/file.js';
export * from '../model/fileView.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-file:file': IDecoratorModelOptions;
    'a-file:fileView': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-file' {
  export interface ModelFile {
    get scope(): ScopeModuleAFile;
  }

  export interface ModelFileView {
    get scope(): ScopeModuleAFile;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/file.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-file:file': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-file' {
  export interface ControllerFile {
    get scope(): ScopeModuleAFile;
  }
}
/** controller: end */
/** entities: begin */
import { EntityFile } from '../entity/file.js';
import { EntityFileView } from '../entity/fileView.js';
export interface IModuleEntity {
  file: EntityFile;
  fileView: EntityFileView;
}
declare module 'vona-module-a-file' {
  export interface EntityFile {
    column: <K extends keyof Omit<EntityFile, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityFile, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityFileView {
    column: <K extends keyof Omit<EntityFileView, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityFileView, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
import { ModelFile } from '../model/file.js';
import { ModelFileView } from '../model/fileView.js';
export interface IModuleModel {
  file: ModelFile;
  fileView: ModelFileView;
}
/** models: end */
/** services: begin */
export * from '../service/file.js';
import { ServiceFile } from '../service/file.js';
export interface IModuleService {
  file: ServiceFile;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-file.service.file': ServiceFile;
  }
}
declare module 'vona-module-a-file' {
  export interface ServiceFile {
    get scope(): ScopeModuleAFile;
  }
}
/** services: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'vona';

@Scope()
export class ScopeModuleAFile extends BeanScopeBase {}

export interface ScopeModuleAFile {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
  model: IModuleModel;
  entity: IModuleEntity;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-file': ScopeModuleAFile;
  }

  export interface IBeanScopeContainer {
    file: ScopeModuleAFile;
  }

  export interface IBeanScopeLocale {
    'a-file': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-file:${K}` {
  return `a-file:${key}`;
}
/** scope: end */
