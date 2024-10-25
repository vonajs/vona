/** beans: begin */
export * from '../bean/bean.cli.js';
export * from '../bean/bean.cliBase_.js';
export * from '../bean/version.manager.js';
import { BeanCli } from '../bean/bean.cli.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    cli: BeanCli;
  }

  export interface IBeanRecordGeneral {
    'a-cli.version.manager': VersionManager;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/cli.js';
/** controllers: end */
/** services: begin */
export * from '../service/cli.js';
export * from '../service/console.js';
export * from '../service/helper.js';
export * from '../service/template.js';
import { ServiceCli } from '../service/cli.js';
import { ServiceConsole } from '../service/console.js';
import { ServiceHelper } from '../service/helper.js';
import { ServiceTemplate } from '../service/template.js';
export interface IModuleService {
  cli: ServiceCli;
  console: ServiceConsole;
  helper: ServiceHelper;
  template: ServiceTemplate;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-cli.service.cli': ServiceCli;
    'a-cli.service.console': ServiceConsole;
    'a-cli.service.helper': ServiceHelper;
    'a-cli.service.template': ServiceTemplate;
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
