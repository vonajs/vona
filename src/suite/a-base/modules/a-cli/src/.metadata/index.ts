/** beans: begin */
export * from '../bean/bean.cli.js';
export * from '../bean/version.manager.js';
export * from '../bean/virtual.cliBase.js';
import { BeanCli } from '../bean/bean.cli.js';
import { VersionManager } from '../bean/version.manager.js';
import { VirtualCliBase } from '../bean/virtual.cliBase.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    cli: BeanCli;
    'a-cli.version.manager': VersionManager;
    'a-cli.virtual.cliBase': VirtualCliBase;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/cli.js';
/** controllers: end */
/** services: begin */
export * from '../service/cli.js';
export * from '../service/local.console.js';
export * from '../service/local.helper.js';
export * from '../service/local.template.js';
import { ServiceCli } from '../service/cli.js';
import { ServiceLocalConsole } from '../service/local.console.js';
import { ServiceLocalHelper } from '../service/local.helper.js';
import { ServiceLocalTemplate } from '../service/local.template.js';
export interface IModuleService {
  cli: ServiceCli;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'a-cli.service.cli': ServiceCli;
    'a-cli.service.local.console': ServiceLocalConsole;
    'a-cli.service.local.helper': ServiceLocalHelper;
    'a-cli.service.local.template': ServiceLocalTemplate;
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
