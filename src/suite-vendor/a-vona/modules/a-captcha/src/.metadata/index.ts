/* eslint-disable */
/** bean: begin */
export * from '../bean/bean.captcha.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-captcha' {
  
        export interface BeanCaptcha {
          /** @internal */
          get scope(): ScopeModuleACaptcha;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanCaptcha } from '../bean/bean.captcha.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'captcha': BeanCaptcha;
  }
}
/** bean: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACaptcha extends BeanScopeBase {}

export interface ScopeModuleACaptcha {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-captcha': ScopeModuleACaptcha;
  }

  export interface IBeanScopeContainer {
    captcha: ScopeModuleACaptcha;
  }
  
  

  
}

/** scope: end */
