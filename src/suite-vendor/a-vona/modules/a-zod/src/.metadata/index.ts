/* eslint-disable */
/** bean: begin */
export * from '../bean/bean.zod.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-zod' {
  
        export interface BeanZod {
          /** @internal */
          get scope(): ScopeModuleAZod;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanZod } from '../bean/bean.zod.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'zod': BeanZod;
  }
}
/** bean: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAZod extends BeanScopeBase {}

export interface ScopeModuleAZod {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-zod': ScopeModuleAZod;
  }

  export interface IBeanScopeContainer {
    zod: ScopeModuleAZod;
  }
  
  

  
}

/** scope: end */
