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
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
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
declare module 'vona-module-a-clibooster' {
  export interface CliCreateApp {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliCreateAtom {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliCreateAtomAction {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliCreateDetail {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliCreateItemOnly {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliCreatePage {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliDefaultList {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliFrontRenderTableCell {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliGitCommit {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliStorePublish {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliStoreSync {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliTokenAdd {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliTokenDelete {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliTokenList {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliToolsBabel {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliToolsDemo {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface CliToolsIcons {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }
}
/** beans: end */
/** service: begin */
export * from '../service/tools.js';
export * from '../service/utils.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-clibooster:tools': never;
    'a-clibooster:utils': never;
  }
}
declare module 'vona-module-a-clibooster' {
  export interface ServiceTools {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }

  export interface ServiceUtils {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
  }
}
/** service: end */
/** service: begin */
import { ServiceTools } from '../service/tools.js';
import { ServiceUtils } from '../service/utils.js';
export interface IModuleService {
  tools: ServiceTools;
  utils: ServiceUtils;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-clibooster.service.tools': ServiceTools;
    'a-clibooster.service.utils': ServiceUtils;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/tools.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-clibooster:tools': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-clibooster' {
  export interface ControllerTools {
    /** @internal */
    get scope(): ScopeModuleAClibooster;
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
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** scope: begin */
import {
  BeanScopeBase,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAClibooster extends BeanScopeBase {}

export interface ScopeModuleAClibooster {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
}

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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-clibooster:${K}` {
  return `a-clibooster:${key}`;
}
/** scope: end */
