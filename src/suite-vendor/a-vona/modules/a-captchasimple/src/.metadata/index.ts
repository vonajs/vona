/* eslint-disable */
/** captchaProvider: begin */
export * from '../bean/captchaProvider.imageText.ts';
import type { ICaptchaProviderOptionsSimple } from '../bean/captchaProvider.imageText.ts';
import 'vona';
declare module 'vona-module-a-captcha' {
  
    export interface ICaptchaProviderRecord {
      'a-captchasimple:imageText': ICaptchaProviderOptionsSimple;
    }

  
}
declare module 'vona-module-a-captchasimple' {
  
        export interface CaptchaProviderImageText {
          /** @internal */
          get scope(): ScopeModuleACaptchasimple;
        }

          export interface CaptchaProviderImageText {
            get $beanFullName(): 'a-captchasimple.captchaProvider.imageText';
            get $onionName(): 'a-captchasimple:imageText';
          } 
}
/** captchaProvider: end */
/** captchaScene: begin */
export * from '../bean/captchaScene.simple.ts';

import { type IDecoratorCaptchaSceneOptions } from 'vona-module-a-captcha';
declare module 'vona-module-a-captcha' {
  
    export interface ICaptchaSceneRecord {
      'a-captchasimple:simple': IDecoratorCaptchaSceneOptions;
    }

  
}
declare module 'vona-module-a-captchasimple' {
  
        export interface CaptchaSceneSimple {
          /** @internal */
          get scope(): ScopeModuleACaptchasimple;
        }

          export interface CaptchaSceneSimple {
            get $beanFullName(): 'a-captchasimple.captchaScene.simple';
            get $onionName(): 'a-captchasimple:simple';
          } 
}
/** captchaScene: end */
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
