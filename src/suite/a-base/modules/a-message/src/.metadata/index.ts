/** beans: begin */
export * from '../bean/stats.message.js';
export * from '../bean/version.manager.js';
import { StatsMessage } from '../bean/stats.message.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-message.stats.message': StatsMessage;
    'a-message.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-message' {
  export interface StatsMessage {
    /** @internal */
    get scope(): ScopeModuleAMessage;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAMessage;
  }
}
/** beans: end */
/** bean: begin */
export * from '../bean/bean.ioMessageUniformBase.js';
export * from '../bean/bean.message.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-message' {
  export interface BeanMessage {
    /** @internal */
    get scope(): ScopeModuleAMessage;
  }
}
/** bean: end */
/** bean: begin */
import { BeanMessage } from '../bean/bean.message.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    message: BeanMessage;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/message.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-message:message': never;
  }
}
declare module 'vona-module-a-message' {
  export interface ServiceMessage {
    /** @internal */
    get scope(): ScopeModuleAMessage;
  }
}
/** service: end */
/** service: begin */
import { ServiceMessage } from '../service/message.js';
export interface IModuleService {
  message: ServiceMessage;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-message.service.message': ServiceMessage;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/message.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-message:message': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-message' {
  export interface ControllerMessage {
    /** @internal */
    get scope(): ScopeModuleAMessage;
  }
}
/** controller: end */
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
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAMessage extends BeanScopeBase {}

export interface ScopeModuleAMessage {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-message': ScopeModuleAMessage;
  }

  export interface IBeanScopeContainer {
    message: ScopeModuleAMessage;
  }

  export interface IBeanScopeConfig {
    'a-message': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-message': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-message:${K}` {
  return `a-message:${key}`;
}
/** scope: end */
