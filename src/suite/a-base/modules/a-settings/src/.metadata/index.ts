/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-settings.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-settings' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleASettings;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/settings.js';
export * from '../entity/settingsRef.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-settings:settings': IDecoratorEntityOptions;
    'a-settings:settingsRef': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-settings' {}
/** entity: end */
/** entity: begin */
import { EntitySettings } from '../entity/settings.js';
import { EntitySettingsRef } from '../entity/settingsRef.js';
export interface IModuleEntity {
  settings: EntitySettings;
  settingsRef: EntitySettingsRef;
}
/** entity: end */
/** entity: begin */
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
/** entity: end */
/** model: begin */
export * from '../model/settings.js';
export * from '../model/settingsRef.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-settings:settings': IDecoratorModelOptions;
    'a-settings:settingsRef': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-settings' {
  export interface ModelSettings {
    /** @internal */
    get scope(): ScopeModuleASettings;
  }

  export interface ModelSettingsRef {
    /** @internal */
    get scope(): ScopeModuleASettings;
  }
}
/** model: end */
/** model: begin */
import { ModelSettings } from '../model/settings.js';
import { ModelSettingsRef } from '../model/settingsRef.js';
export interface IModuleModel {
  settings: ModelSettings;
  settingsRef: ModelSettingsRef;
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.settings.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-settings' {
  export interface BeanSettings {
    /** @internal */
    get scope(): ScopeModuleASettings;
  }
}
/** bean: end */
/** bean: begin */
import { BeanSettings } from '../bean/bean.settings.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    settings: BeanSettings;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/settings.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-settings:settings': never;
  }
}
declare module 'vona-module-a-settings' {
  export interface ServiceSettings {
    /** @internal */
    get scope(): ScopeModuleASettings;
  }
}
/** service: end */
/** service: begin */
import { ServiceSettings } from '../service/settings.js';
export interface IModuleService {
  settings: ServiceSettings;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-settings.service.settings': ServiceSettings;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/settings.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-settings:settings': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-settings' {
  export interface ControllerSettings {
    /** @internal */
    get scope(): ScopeModuleASettings;
  }
}
/** controller: end */
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
  entity: IModuleEntity;
  model: IModuleModel;
  service: IModuleService;
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
