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
    /** @internal */
    get scope(): ScopeModuleACodemirror;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACodemirror extends BeanScopeBase {}

export interface ScopeModuleACodemirror {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
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
