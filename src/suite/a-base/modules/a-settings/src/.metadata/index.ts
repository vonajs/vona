/** beans: begin */
export * from '../bean/bean.settings.js';
export * from '../bean/version.manager.js';
import { BeanSettings } from '../bean/bean.settings.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    settings: BeanSettings;
  }

  export interface IBeanRecordGeneral {
    'a-settings.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-settings' {
  export interface BeanSettings {
    get scope(): ScopeModuleASettings;
  }

  export interface VersionManager {
    get scope(): ScopeModuleASettings;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/settings.js';
export * from '../entity/settingsRef.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-settings:settings': IDecoratorEntityOptions;
    'a-settings:settingsRef': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-settings' {
  export interface EntitySettings {
    get scope(): ScopeModuleASettings;
  }

  export interface EntitySettingsRef {
    get scope(): ScopeModuleASettings;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/settings.js';
export * from '../model/settingsRef.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-settings:settings': IDecoratorModelOptions;
    'a-settings:settingsRef': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-settings' {
  export interface ModelSettings {
    get scope(): ScopeModuleASettings;
  }

  export interface ModelSettingsRef {
    get scope(): ScopeModuleASettings;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/settings.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-settings:settings': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-settings' {
  export interface ControllerSettings {
    get scope(): ScopeModuleASettings;
  }
}
/** controller: end */
/** entities: begin */
import { EntitySettings } from '../entity/settings.js';
import { EntitySettingsRef } from '../entity/settingsRef.js';
export interface IModuleEntity {
  settings: EntitySettings;
  settingsRef: EntitySettingsRef;
}
declare module 'vona-module-a-settings' {
  export interface EntitySettings {
    column: <K extends keyof Omit<EntitySettings, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntitySettings, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntitySettingsRef {
    column: <K extends keyof Omit<EntitySettingsRef, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntitySettingsRef, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
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
export class ScopeModuleASettings extends BeanScopeBase {}

export interface ScopeModuleASettings {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  constant: TypeModuleConstants<typeof constants>;
  service: IModuleService;
  model: IModuleModel;
  entity: IModuleEntity;
}

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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-settings:${K}` {
  return `a-settings:${key}`;
}
/** scope: end */
