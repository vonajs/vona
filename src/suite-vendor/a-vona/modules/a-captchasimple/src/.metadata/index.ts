/* eslint-disable */
/** captchaProvider: begin */
export * from '../bean/captchaProvider.simple.ts';
import type { ICaptchaProviderOptionsSimple } from '../bean/captchaProvider.simple.ts';
import 'vona';
declare module 'vona-module-a-captcha' {
  
    export interface ICaptchaProviderRecord {
      'a-captchasimple:simple': ICaptchaProviderOptionsSimple;
    }

  
}
declare module 'vona-module-a-captchasimple' {
  
        export interface CaptchaProviderSimple {
          /** @internal */
          get scope(): ScopeModuleACaptchasimple;
        }

          export interface CaptchaProviderSimple {
            get $beanFullName(): 'a-captchasimple.captchaProvider.simple';
            get $onionName(): 'a-captchasimple:simple';
          } 
}
/** captchaProvider: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACaptchasimple extends BeanScopeBase {}

export interface ScopeModuleACaptchasimple {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-captchasimple': ScopeModuleACaptchasimple;
  }

  export interface IBeanScopeContainer {
    captchasimple: ScopeModuleACaptchasimple;
  }
  
  

  
}

/** scope: end */
