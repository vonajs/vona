/** beans: begin */
export * from '../bean/bean.cli.js';
export * from '../bean/version.manager.js';
export * from '../bean/virtual.cliBase.js';
import { BeanCli } from '../bean/bean.cli.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    cli: BeanCli;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/cli.js';
/** controllers: end */
/** services: begin */
export * from '../service/cli.js';
import { ServiceCli } from '../service/cli.js';
export interface IModuleService {
  cli: ServiceCli;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'a-cli.service.cli': ServiceCli;
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
export class ScopeModuleACli extends BeanScopeBase {}

export interface ScopeModuleACli
  extends TypeModuleResource<typeof config, any, (typeof locales)[TypeLocaleBase], any, IModuleService, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-cli': ScopeModuleACli;
  }

  export interface IBeanScopeConfig {
    'a-cli': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-cli': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
