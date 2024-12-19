/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-pinyin.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-pinyin' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAPinyin;
  }
}
/** beans: end */
/** bean: begin */
export * from '../bean/bean.pinyin.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-pinyin' {
  export interface BeanPinyin {
    /** @internal */
    get scope(): ScopeModuleAPinyin;
  }
}
/** bean: end */
/** bean: begin */
import { BeanPinyin } from '../bean/bean.pinyin.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    pinyin: BeanPinyin;
  }
}
/** bean: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAPinyin extends BeanScopeBase {}

export interface ScopeModuleAPinyin {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-pinyin': ScopeModuleAPinyin;
  }

  export interface IBeanScopeContainer {
    pinyin: ScopeModuleAPinyin;
  }
}

/** scope: end */
