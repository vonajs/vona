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
import { CliCreateApp } from '../bean/cli.create.app.js';
import { CliCreateAtom } from '../bean/cli.create.atom.js';
import { CliCreateAtomAction } from '../bean/cli.create.atomAction.js';
import { CliCreateDetail } from '../bean/cli.create.detail.js';
import { CliCreateItemOnly } from '../bean/cli.create.itemOnly.js';
import { CliCreatePage } from '../bean/cli.create.page.js';
import { CliDefaultList } from '../bean/cli.default.list.js';
import { CliFrontRenderTableCell } from '../bean/cli.front.renderTableCell.js';
import { CliGitCommit } from '../bean/cli.git.commit.js';
import { CliStorePublish } from '../bean/cli.store.publish.js';
import { CliStoreSync } from '../bean/cli.store.sync.js';
import { CliTokenAdd } from '../bean/cli.token.add.js';
import { CliTokenDelete } from '../bean/cli.token.delete.js';
import { CliTokenList } from '../bean/cli.token.list.js';
import { CliToolsBabel } from '../bean/cli.tools.babel.js';
import { CliToolsDemo } from '../bean/cli.tools.demo.js';
import { CliToolsIcons } from '../bean/cli.tools.icons.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'a-clibooster.cli.create.app': CliCreateApp;
    'a-clibooster.cli.create.atom': CliCreateAtom;
    'a-clibooster.cli.create.atomAction': CliCreateAtomAction;
    'a-clibooster.cli.create.detail': CliCreateDetail;
    'a-clibooster.cli.create.itemOnly': CliCreateItemOnly;
    'a-clibooster.cli.create.page': CliCreatePage;
    'a-clibooster.cli.default.list': CliDefaultList;
    'a-clibooster.cli.front.renderTableCell': CliFrontRenderTableCell;
    'a-clibooster.cli.git.commit': CliGitCommit;
    'a-clibooster.cli.store.publish': CliStorePublish;
    'a-clibooster.cli.store.sync': CliStoreSync;
    'a-clibooster.cli.token.add': CliTokenAdd;
    'a-clibooster.cli.token.delete': CliTokenDelete;
    'a-clibooster.cli.token.list': CliTokenList;
    'a-clibooster.cli.tools.babel': CliToolsBabel;
    'a-clibooster.cli.tools.demo': CliToolsDemo;
    'a-clibooster.cli.tools.icons': CliToolsIcons;
    'a-clibooster.version.manager': VersionManager;
  }
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
  export interface IBeanRecord {
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
    any,
    IModuleService,
    any
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-clibooster': ScopeModuleAClibooster;
  }

  export interface IBeanScopeConfig {
    'a-clibooster': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-clibooster': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
