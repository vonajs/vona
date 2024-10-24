/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'a-dashboard.version.manager': VersionManager;
  }
}
/** beans: end */
/** atoms: begin */
export * from '../atom/dashboard.js';
/** atoms: end */
/** controllers: begin */
export * from '../controller/dashboard.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/dashboard.js';
export * from '../entity/dashboardContent.js';
export * from '../entity/dashboardFull.js';
export * from '../entity/dashboardUser.js';
/** entities: end */
/** models: begin */
export * from '../model/dashboard.js';
export * from '../model/dashboardContent.js';
export * from '../model/dashboardFull.js';
export * from '../model/dashboardUser.js';
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
  export interface IBeanRecord {
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
  extends TypeModuleResource<any, any, (typeof locales)[TypeLocaleBase], any, IModuleService, IModuleModel> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-dashboard': ScopeModuleADashboard;
  }

  export interface IBeanScopeLocale {
    'a-dashboard': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
