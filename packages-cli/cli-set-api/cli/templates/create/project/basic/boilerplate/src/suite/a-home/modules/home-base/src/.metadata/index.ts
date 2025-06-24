/* eslint-disable */
import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
/** service: begin */
export * from '../service/menu.ts';

import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IServiceRecord {
      'home-base:menu': never;
    }

  
}
declare module 'vona-module-home-base' {
  
        export interface ServiceMenu {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        } 
}
/** service: end */
/** service: begin */
import type { ServiceMenu } from '../service/menu.ts';
export interface IModuleService {
  'menu': ServiceMenu;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'home-base.service.menu': ServiceMenu;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/menu.ts';
import type { IControllerOptionsMenu } from '../controller/menu.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'home-base:menu': IControllerOptionsMenu;
    }

  
}
declare module 'vona-module-home-base' {
  
        export interface ControllerMenu {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        } 
}
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerMenu } from '../controller/menu.ts';
declare module 'vona-module-home-base' {
  
    export interface IControllerOptionsMenu {
      actions?: TypeControllerOptionsActions<ControllerMenu>;
    }
}
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord{
        '/home/base/menu/:publicPath?': undefined;
    }

}
/** controller: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase {
  util: BeanScopeUtil;
service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }

  export interface IBeanScopeContainer {
    homeBase: ScopeModuleHomeBase;
  }
  
  

  
}

/** scope: end */
