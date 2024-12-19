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
    /** @internal */
    get scope(): ScopeModuleADashboard;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/dashboard.js';
export * from '../entity/dashboardContent.js';
export * from '../entity/dashboardFull.js';
export * from '../entity/dashboardUser.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-dashboard:dashboard': IDecoratorEntityOptions;
    'a-dashboard:dashboardContent': IDecoratorEntityOptions;
    'a-dashboard:dashboardFull': IDecoratorEntityOptions;
    'a-dashboard:dashboardUser': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-dashboard' {}
/** entity: end */
/** entity: begin */
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
/** entity: end */
/** entity: begin */
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
/** entity: end */
/** model: begin */
export * from '../model/dashboard.js';
export * from '../model/dashboardContent.js';
export * from '../model/dashboardFull.js';
export * from '../model/dashboardUser.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-dashboard:dashboard': IDecoratorModelOptions;
    'a-dashboard:dashboardContent': IDecoratorModelOptions;
    'a-dashboard:dashboardFull': IDecoratorModelOptions;
    'a-dashboard:dashboardUser': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-dashboard' {
  export interface ModelDashboard {
    /** @internal */
    get scope(): ScopeModuleADashboard;
  }

  export interface ModelDashboardContent {
    /** @internal */
    get scope(): ScopeModuleADashboard;
  }

  export interface ModelDashboardFull {
    /** @internal */
    get scope(): ScopeModuleADashboard;
  }

  export interface ModelDashboardUser {
    /** @internal */
    get scope(): ScopeModuleADashboard;
  }
}
/** model: end */
/** model: begin */
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
/** model: end */
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
    /** @internal */
    get scope(): ScopeModuleADashboard;
  }
}
/** atom: end */
/** service: begin */
export * from '../service/dashboard.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-dashboard:dashboard': never;
  }
}
declare module 'vona-module-a-dashboard' {
  export interface ServiceDashboard {
    /** @internal */
    get scope(): ScopeModuleADashboard;
  }
}
/** service: end */
/** service: begin */
import { ServiceDashboard } from '../service/dashboard.js';
export interface IModuleService {
  dashboard: ServiceDashboard;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-dashboard.service.dashboard': ServiceDashboard;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/dashboard.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-dashboard:dashboard': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-dashboard' {
  export interface ControllerDashboard {
    /** @internal */
    get scope(): ScopeModuleADashboard;
  }
}
/** controller: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleADashboard extends BeanScopeBase {}

export interface ScopeModuleADashboard {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  entity: IModuleEntity;
  model: IModuleModel;
  service: IModuleService;
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
