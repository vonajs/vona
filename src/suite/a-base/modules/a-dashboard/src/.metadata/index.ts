/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-dashboard.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-dashboard' {
  export interface VersionManager {
    get scope(): ScopeModuleADashboard;
  }
}
/** beans: end */
/** atom: begin */
export * from '../atom/dashboard.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'a-dashboard:dashboard': never;
  }
}
declare module 'vona-module-a-dashboard' {
  export interface AtomDashboard {
    get scope(): ScopeModuleADashboard;
  }
}
/** atom: end */
/** entity: begin */
export * from '../entity/dashboard.js';
export * from '../entity/dashboardContent.js';
export * from '../entity/dashboardFull.js';
export * from '../entity/dashboardUser.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-dashboard:dashboard': IDecoratorEntityOptions;
    'a-dashboard:dashboardContent': IDecoratorEntityOptions;
    'a-dashboard:dashboardFull': IDecoratorEntityOptions;
    'a-dashboard:dashboardUser': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-dashboard' {}
/** entity: end */
/** model: begin */
export * from '../model/dashboard.js';
export * from '../model/dashboardContent.js';
export * from '../model/dashboardFull.js';
export * from '../model/dashboardUser.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-dashboard:dashboard': IDecoratorModelOptions;
    'a-dashboard:dashboardContent': IDecoratorModelOptions;
    'a-dashboard:dashboardFull': IDecoratorModelOptions;
    'a-dashboard:dashboardUser': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-dashboard' {
  export interface ModelDashboard {
    get scope(): ScopeModuleADashboard;
  }

  export interface ModelDashboardContent {
    get scope(): ScopeModuleADashboard;
  }

  export interface ModelDashboardFull {
    get scope(): ScopeModuleADashboard;
  }

  export interface ModelDashboardUser {
    get scope(): ScopeModuleADashboard;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/dashboard.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-dashboard:dashboard': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-dashboard' {
  export interface ControllerDashboard {
    get scope(): ScopeModuleADashboard;
  }
}
/** controller: end */
/** entities: begin */
import { EntityDashboard } from '../entity/dashboard.js';
import { EntityDashboardContent } from '../entity/dashboardContent.js';
import { EntityDashboardFull } from '../entity/dashboardFull.js';
import { EntityDashboardUser } from '../entity/dashboardUser.js';
export interface IModuleEntity {
  dashboard: EntityDashboard;
  dashboardContent: EntityDashboardContent;
  dashboardFull: EntityDashboardFull;
  dashboardUser: EntityDashboardUser;
}
declare module 'vona-module-a-dashboard' {
  export interface EntityDashboard {
    column: <K extends keyof Omit<EntityDashboard, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityDashboard, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityDashboardContent {
    column: <K extends keyof Omit<EntityDashboardContent, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityDashboardContent, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityDashboardFull {
    column: <K extends keyof Omit<EntityDashboardFull, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityDashboardFull, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityDashboardUser {
    column: <K extends keyof Omit<EntityDashboardUser, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityDashboardUser, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
import { ModelDashboard } from '../model/dashboard.js';
import { ModelDashboardContent } from '../model/dashboardContent.js';
import { ModelDashboardFull } from '../model/dashboardFull.js';
import { ModelDashboardUser } from '../model/dashboardUser.js';
export interface IModuleModel {
  dashboard: ModelDashboard;
  dashboardContent: ModelDashboardContent;
  dashboardFull: ModelDashboardFull;
  dashboardUser: ModelDashboardUser;
}
/** models: end */
/** services: begin */
export * from '../service/dashboard.js';
import { ServiceDashboard } from '../service/dashboard.js';
export interface IModuleService {
  dashboard: ServiceDashboard;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-dashboard.service.dashboard': ServiceDashboard;
  }
}
declare module 'vona-module-a-dashboard' {
  export interface ServiceDashboard {
    get scope(): ScopeModuleADashboard;
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
export class ScopeModuleADashboard extends BeanScopeBase {}

export interface ScopeModuleADashboard {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
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
    'a-dashboard': ScopeModuleADashboard;
  }

  export interface IBeanScopeContainer {
    dashboard: ScopeModuleADashboard;
  }

  export interface IBeanScopeLocale {
    'a-dashboard': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-dashboard:${K}` {
  return `a-dashboard:${key}`;
}
/** scope: end */
