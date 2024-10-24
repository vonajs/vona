/** beans: begin */
export * from '../bean/bean.message.js';
export * from '../bean/stats.message.js';
export * from '../bean/version.manager.js';
import { BeanMessage } from '../bean/bean.message.js';
import { StatsMessage } from '../bean/stats.message.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    message: BeanMessage;
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
export * from '../service/virtual.ioMessageUniformBase.js';
import { ServiceMessage } from '../service/message.js';
import { ServiceVirtualIoMessageUniformBase } from '../service/virtual.ioMessageUniformBase.js';
export interface IModuleService {
  message: ServiceMessage;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'a-message.service.message': ServiceMessage;
    'a-message.service.virtual.ioMessageUniformBase': ServiceVirtualIoMessageUniformBase;
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
  extends TypeModuleResource<typeof config, any, (typeof locales)[TypeLocaleBase], any, IModuleService, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-message': ScopeModuleAMessage;
  }

  export interface IBeanScopeConfig {
    'a-message': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-message': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
