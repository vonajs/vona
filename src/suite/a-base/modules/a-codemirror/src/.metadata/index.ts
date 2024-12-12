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
declare module 'vona-module-a-codemirror' {
  export interface VersionManager {
    get scope(): ScopeModuleACodemirror;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleACodemirror extends BeanScopeBase {}

export interface ScopeModuleACodemirror {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  queue: IModuleQueue;
}

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
