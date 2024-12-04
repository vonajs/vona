/** beans: begin */
export * from '../bean/bean.ioMessageUniformBase_.js';
export * from '../bean/bean.message.js';
export * from '../bean/stats.message.js';
export * from '../bean/version.manager.js';
import { BeanIoMessageUniformBase } from '../bean/bean.ioMessageUniformBase_.js';
import { BeanMessage } from '../bean/bean.message.js';
import { StatsMessage } from '../bean/stats.message.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    message: BeanMessage;
  }

  export interface IBeanRecordGeneral {
    ioMessageUniformBase: BeanIoMessageUniformBase;
    'a-message.stats.message': StatsMessage;
    'a-message.version.manager': VersionManager;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/message.js';
/** controllers: end */
/** services: begin */
export * from '../service/message.js';
import { ServiceMessage } from '../service/message.js';
export interface IModuleService {
  message: ServiceMessage;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-message.service.message': ServiceMessage;
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAMessage extends BeanScopeBase {}

export interface ScopeModuleAMessage
  extends TypeModuleResource<
    typeof config,
    never,
    (typeof locales)[TypeLocaleBase],
    never,
    IModuleService,
    never,
    never
  > {}

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
