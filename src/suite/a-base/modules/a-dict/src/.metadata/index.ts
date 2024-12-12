/** beans: begin */
export * from '../bean/bean.dict.js';
export * from '../bean/version.manager.js';
import { BeanDict } from '../bean/bean.dict.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    dict: BeanDict;
  }

  export interface IBeanRecordGeneral {
    'a-dict.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-dict' {
  export interface BeanDict {
    get scope(): ScopeModuleADict;
  }

  export interface VersionManager {
    get scope(): ScopeModuleADict;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/dict.js';
export * from '../entity/dictContent.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-dict:dict': IDecoratorEntityOptions;
    'a-dict:dictContent': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-dict' {}
/** entity: end */
/** model: begin */
export * from '../model/dict.js';
export * from '../model/dictContent.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-dict:dict': IDecoratorModelOptions;
    'a-dict:dictContent': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-dict' {
  export interface ModelDict {
    get scope(): ScopeModuleADict;
  }

  export interface ModelDictContent {
    get scope(): ScopeModuleADict;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/dict.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-dict:dict': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-dict' {
  export interface ControllerDict {
    get scope(): ScopeModuleADict;
  }
}
/** controller: end */
/** atom: begin */
export * from '../atom/dict.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'a-dict:dict': never;
  }
}
declare module 'vona-module-a-dict' {
  export interface AtomDict {
    get scope(): ScopeModuleADict;
  }
}
/** atom: end */
/** entities: begin */
import { EntityDict } from '../entity/dict.js';
import { EntityDictContent } from '../entity/dictContent.js';
export interface IModuleEntity {
  dict: EntityDict;
  dictContent: EntityDictContent;
}
declare module 'vona-module-a-dict' {
  export interface EntityDict {
    column: <K extends keyof Omit<EntityDict, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityDict, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityDictContent {
    column: <K extends keyof Omit<EntityDictContent, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityDictContent, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
import { ModelDict } from '../model/dict.js';
import { ModelDictContent } from '../model/dictContent.js';
export interface IModuleModel {
  dict: ModelDict;
  dictContent: ModelDictContent;
}
/** models: end */
/** services: begin */
export * from '../service/dict.js';
import { ServiceDict } from '../service/dict.js';
export interface IModuleService {
  dict: ServiceDict;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-dict.service.dict': ServiceDict;
  }
}
declare module 'vona-module-a-dict' {
  export interface ServiceDict {
    get scope(): ScopeModuleADict;
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
export class ScopeModuleADict extends BeanScopeBase {}

export interface ScopeModuleADict {
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
    'a-dict': ScopeModuleADict;
  }

  export interface IBeanScopeContainer {
    dict: ScopeModuleADict;
  }

  export interface IBeanScopeLocale {
    'a-dict': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-dict:${K}` {
  return `a-dict:${key}`;
}
/** scope: end */
