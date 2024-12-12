/** beans: begin */
export * from '../bean/bean.userOnline.js';
export * from '../bean/version.manager.js';
import { BeanUserOnline } from '../bean/bean.userOnline.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    userOnline: BeanUserOnline;
  }

  export interface IBeanRecordGeneral {
    'a-useronline.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-useronline' {
  export interface BeanUserOnline {
    get scope(): ScopeModuleAUseronline;
  }

  export interface VersionManager {
    get scope(): ScopeModuleAUseronline;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/userOnline.js';
export * from '../entity/userOnlineHistory.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-useronline:userOnline': IDecoratorEntityOptions;
    'a-useronline:userOnlineHistory': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-useronline' {}
/** entity: end */
/** model: begin */
export * from '../model/userOnline.js';
export * from '../model/userOnlineHistory.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-useronline:userOnline': IDecoratorModelOptions;
    'a-useronline:userOnlineHistory': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-useronline' {
  export interface ModelUserOnline {
    get scope(): ScopeModuleAUseronline;
  }

  export interface ModelUserOnlineHistory {
    get scope(): ScopeModuleAUseronline;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/userOnline.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-useronline:userOnline': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-useronline' {
  export interface ControllerUserOnline {
    get scope(): ScopeModuleAUseronline;
  }
}
/** controller: end */
/** atom: begin */
export * from '../atom/userOnline.js';
export * from '../atom/userOnlineHistory.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'a-useronline:userOnline': never;
    'a-useronline:userOnlineHistory': never;
  }
}
declare module 'vona-module-a-useronline' {
  export interface AtomUserOnline {
    get scope(): ScopeModuleAUseronline;
  }

  export interface AtomUserOnlineHistory {
    get scope(): ScopeModuleAUseronline;
  }
}
/** atom: end */
/** entities: begin */
import { EntityUserOnline } from '../entity/userOnline.js';
import { EntityUserOnlineHistory } from '../entity/userOnlineHistory.js';
export interface IModuleEntity {
  userOnline: EntityUserOnline;
  userOnlineHistory: EntityUserOnlineHistory;
}
declare module 'vona-module-a-useronline' {
  export interface EntityUserOnline {
    column: <K extends keyof Omit<EntityUserOnline, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityUserOnline, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityUserOnlineHistory {
    column: <K extends keyof Omit<EntityUserOnlineHistory, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityUserOnlineHistory, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
import { ModelUserOnline } from '../model/userOnline.js';
import { ModelUserOnlineHistory } from '../model/userOnlineHistory.js';
export interface IModuleModel {
  userOnline: ModelUserOnline;
  userOnlineHistory: ModelUserOnlineHistory;
}
/** models: end */
/** services: begin */
export * from '../service/userOnline.js';
import { ServiceUserOnline } from '../service/userOnline.js';
export interface IModuleService {
  userOnline: ServiceUserOnline;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-useronline.service.userOnline': ServiceUserOnline;
  }
}
declare module 'vona-module-a-useronline' {
  export interface ServiceUserOnline {
    get scope(): ScopeModuleAUseronline;
  }
}
/** services: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
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
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleAUseronline extends BeanScopeBase {}

export interface ScopeModuleAUseronline {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
  model: IModuleModel;
  entity: IModuleEntity;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-useronline': ScopeModuleAUseronline;
  }

  export interface IBeanScopeContainer {
    useronline: ScopeModuleAUseronline;
  }

  export interface IBeanScopeConfig {
    'a-useronline': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-useronline': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-useronline:${K}` {
  return `a-useronline:${key}`;
}
/** scope: end */
