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
/** model: end */
/** controller: begin */
export * from '../controller/dict.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-dict:dict': IDecoratorControllerOptions;
  }
}
/** controller: end */
/** atoms: begin */
export * from '../atom/dict.js';
/** atoms: end */
/** entities: begin */
import { EntityDict } from '../entity/dict.js';
import { EntityDictContent } from '../entity/dictContent.js';
export interface IModuleEntity {
  dict: EntityDict;
  dictContent: EntityDictContent;
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
