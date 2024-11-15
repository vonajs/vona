/** beans: begin */
export * from '../bean/cli.create.app.js';
export * from '../bean/cli.create.atom.js';
export * from '../bean/cli.create.atomAction.js';
export * from '../bean/cli.create.detail.js';
export * from '../bean/cli.create.itemOnly.js';
export * from '../bean/cli.create.page.js';
export * from '../bean/cli.default.list.js';
export * from '../bean/cli.front.renderTableCell.js';
export * from '../bean/cli.git.commit.js';
export * from '../bean/cli.store.publish.js';
export * from '../bean/cli.store.sync.js';
export * from '../bean/cli.token.add.js';
export * from '../bean/cli.token.delete.js';
export * from '../bean/cli.token.list.js';
export * from '../bean/cli.tools.babel.js';
export * from '../bean/cli.tools.demo.js';
export * from '../bean/cli.tools.icons.js';
export * from '../bean/version.manager.js';

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}
}
/** beans: end */
/** controllers: begin */
export * from '../controller/tools.js';
/** controllers: end */
/** services: begin */
export * from '../service/tools.js';
export * from '../service/utils.js';
import { ServiceTools } from '../service/tools.js';
import { ServiceUtils } from '../service/utils.js';
export interface IModuleService {
  tools: ServiceTools;
  utils: ServiceUtils;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-clibooster.service.tools': ServiceTools;
    'a-clibooster.service.utils': ServiceUtils;
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
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAClibooster extends BeanScopeBase {}

export interface ScopeModuleAClibooster
  extends TypeModuleResource<
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    never,
    IModuleService,
    never
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-clibooster': ScopeModuleAClibooster;
  }

  export interface IBeanScopeContainer {
    clibooster: ScopeModuleAClibooster;
  }

  export interface IBeanScopeConfig {
    'a-clibooster': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-clibooster': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
