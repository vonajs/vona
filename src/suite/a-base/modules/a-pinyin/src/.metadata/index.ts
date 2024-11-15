/** beans: begin */
export * from '../bean/bean.pinyin.js';
export * from '../bean/version.manager.js';
import { BeanPinyin } from '../bean/bean.pinyin.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    pinyin: BeanPinyin;
  }

  export interface IBeanRecordGeneral {
    'a-pinyin.version.manager': VersionManager;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAPinyin extends BeanScopeBase {}

export interface ScopeModuleAPinyin extends TypeModuleResource<never, never, never, never, never, never> {}

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
