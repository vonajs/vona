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
/** beans: end */
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
/** model: end */
/** atoms: begin */
export * from '../atom/dashboard.js';
/** atoms: end */
/** controllers: begin */
export * from '../controller/dashboard.js';
/** controllers: end */
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleADashboard extends BeanScopeBase {}

export interface ScopeModuleADashboard
  extends TypeModuleResource<
    never,
    never,
    (typeof locales)[TypeLocaleBase],
    never,
    IModuleService,
    IModuleModel,
    IModuleEntity
  > {}

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
