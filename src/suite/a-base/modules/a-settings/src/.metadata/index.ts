/** beans: begin */
export * from '../bean/bean.settings.js';
export * from '../bean/version.manager.js';
import { BeanSettings } from '../bean/bean.settings.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    settings: BeanSettings;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/settings.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/settings.js';
export * from '../entity/settingsRef.js';
/** entities: end */
/** models: begin */
export * from '../model/settings.js';
export * from '../model/settingsRef.js';
import { ModelSettings } from '../model/settings.js';
import { ModelSettingsRef } from '../model/settingsRef.js';
export interface IModuleModel {
  settings: ModelSettings;
  settingsRef: ModelSettingsRef;
}
/** models: end */
/** services: begin */
export * from '../service/settings.js';
import { ServiceSettings } from '../service/settings.js';
export interface IModuleService {
  settings: ServiceSettings;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-settings.service.settings': ServiceSettings;
  }
}
/** services: end */
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleASettings extends BeanScopeBase {}

export interface ScopeModuleASettings
  extends TypeModuleResource<
    never,
    never,
    (typeof locales)[TypeLocaleBase],
    typeof constants,
    IModuleService,
    IModuleModel
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-settings': ScopeModuleASettings;
  }

  export interface IBeanScopeContainer {
    settings: ScopeModuleASettings;
  }

  export interface IBeanScopeLocale {
    'a-settings': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
