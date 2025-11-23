/* eslint-disable */
import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
/** controller: begin */
export * from '../controller/play.ts';
import type { IControllerOptionsPlay } from '../controller/play.ts';
import 'vona-module-a-web';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'a-play:play': IControllerOptionsPlay;
    }

  
}
declare module 'vona-module-a-play' {
  
        export interface ControllerPlay {
          /** @internal */
          get scope(): ScopeModuleAPlay;
        }

          export interface ControllerPlay {
            get $beanFullName(): 'a-play.controller.play';
            get $onionName(): 'a-play:play';
            get $onionOptions(): IControllerOptionsPlay;
          } 
}
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerPlay } from '../controller/play.ts';
declare module 'vona-module-a-play' {
  
    export interface IControllerOptionsPlay {
      actions?: TypeControllerOptionsActions<ControllerPlay>;
    }
}

/** controller: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAPlay extends BeanScopeBase {}

export interface ScopeModuleAPlay {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-play': ScopeModuleAPlay;
  }

  export interface IBeanScopeContainer {
    play: ScopeModuleAPlay;
  }
  
  

  

  
}

/** scope: end */
