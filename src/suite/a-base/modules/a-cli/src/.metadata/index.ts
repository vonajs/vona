/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-cli.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-cli' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleACli;
  }
}
/** beans: end */
/** bean: begin */
export * from '../bean/bean.cli.js';
export * from '../bean/bean.cliBase_.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-cli' {
  export interface BeanCli {
    /** @internal */
    get scope(): ScopeModuleACli;
  }
}
/** bean: end */
/** bean: begin */
import { BeanCli } from '../bean/bean.cli.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    cli: BeanCli;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/cli.js';
export * from '../service/console.js';
export * from '../service/helper.js';
export * from '../service/template.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-cli:cli': never;
    'a-cli:console': never;
    'a-cli:helper': never;
    'a-cli:template': never;
  }
}
declare module 'vona-module-a-cli' {
  export interface ServiceCli {
    /** @internal */
    get scope(): ScopeModuleACli;
  }

  export interface ServiceConsole {
    /** @internal */
    get scope(): ScopeModuleACli;
  }

  export interface ServiceHelper {
    /** @internal */
    get scope(): ScopeModuleACli;
  }

  export interface ServiceTemplate {
    /** @internal */
    get scope(): ScopeModuleACli;
  }
}
/** service: end */
/** service: begin */
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
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-cli.service.cli': ServiceCli;
    'a-cli.service.console': ServiceConsole;
    'a-cli.service.helper': ServiceHelper;
    'a-cli.service.template': ServiceTemplate;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/cli.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-cli:cli': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-cli' {
  export interface ControllerCli {
    /** @internal */
    get scope(): ScopeModuleACli;
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
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleACli extends BeanScopeBase {}

export interface ScopeModuleACli {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-cli': ScopeModuleACli;
  }

  export interface IBeanScopeContainer {
    cli: ScopeModuleACli;
  }

  export interface IBeanScopeConfig {
    'a-cli': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-cli': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-cli:${K}` {
  return `a-cli:${key}`;
}
/** scope: end */
