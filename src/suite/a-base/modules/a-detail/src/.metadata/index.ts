/** beans: begin */
export * from '../bean/bean.detail.js';
export * from '../bean/version.manager.js';
import { BeanDetail } from '../bean/bean.detail.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    detail: BeanDetail;
  }

  export interface IBeanRecordGeneral {
    'a-detail.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-detail' {
  export interface BeanDetail {
    get scope(): ScopeModuleADetail;
  }

  export interface VersionManager {
    get scope(): ScopeModuleADetail;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/detailBase.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-detail:detailBase': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-detail' {}
/** entity: end */
/** model: begin */
export * from '../model/detailBase.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-detail:detailBase': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-detail' {
  export interface ModelDetailBase {
    get scope(): ScopeModuleADetail;
  }
}
/** model: end */
/** entities: begin */
import { EntityDetailBase } from '../entity/detailBase.js';
export interface IModuleEntity {
  detailBase: EntityDetailBase;
}
declare module 'vona-module-a-detail' {
  export interface EntityDetailBase {
    column: <K extends keyof Omit<EntityDetailBase, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityDetailBase, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
import { ModelDetailBase } from '../model/detailBase.js';
export interface IModuleModel {
  detailBase: ModelDetailBase;
}
/** models: end */
/** constant: begin */
export * from '../config/constants.js';
import { constants } from '../config/constants.js';
/** constant: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import {
  BeanScopeBase,
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleLocales,
  TypeLocaleBase,
  TypeModuleConstants,
} from 'vona';

@Scope()
export class ScopeModuleADetail extends BeanScopeBase {}

export interface ScopeModuleADetail {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  constant: TypeModuleConstants<typeof constants>;
  model: IModuleModel;
  entity: IModuleEntity;
  atom: IModuleatom;
  middleware: IModulemiddleware;
  guard: IModuleguard;
  interceptor: IModuleinterceptor;
  pipe: IModulepipe;
  filter: IModulefilter;
  socketConnection: IModulesocketConnection;
  socketPacket: IModulesocketPacket;
  aop: IModuleaop;
  entity: IModuleentity;
  model: IModulemodel;
  controller: IModulecontroller;
  meta: IModulemeta;
  summerCache: IModulesummerCache;
  startup: IModulestartup;
  queue: IModulequeue;
  schedule: IModuleschedule;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-detail': ScopeModuleADetail;
  }

  export interface IBeanScopeContainer {
    detail: ScopeModuleADetail;
  }

  export interface IBeanScopeLocale {
    'a-detail': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-detail:${K}` {
  return `a-detail:${key}`;
}
/** scope: end */
