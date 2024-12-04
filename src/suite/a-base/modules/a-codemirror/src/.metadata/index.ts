/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-codemirror.version.manager': VersionManager;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleACodemirror extends BeanScopeBase {}

export interface ScopeModuleACodemirror extends TypeModuleResource<never, never, never, never, never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-codemirror': ScopeModuleACodemirror;
  }

  export interface IBeanScopeContainer {
    codemirror: ScopeModuleACodemirror;
  }
}

/** scope: end */
