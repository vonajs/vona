/* eslint-disable */
import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
/** service: begin */
export * from '../service/menu.ts';

import 'vona-module-a-bean';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'home-base:menu': never;
    }

  
}
declare module 'vona-module-home-base' {
  
        export interface ServiceMenu {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

          export interface ServiceMenu {
            get $beanFullName(): 'home-base.service.menu';
            get $onionName(): 'home-base:menu';
            
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
export * from '../controller/permission.ts';
import type { IControllerOptionsMenu } from '../controller/menu.ts';
import type { IControllerOptionsPermission } from '../controller/permission.ts';
import 'vona-module-a-web';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'home-base:menu': IControllerOptionsMenu;
'home-base:permission': IControllerOptionsPermission;
    }

  
}
declare module 'vona-module-home-base' {
  
        export interface ControllerMenu {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

          export interface ControllerMenu {
            get $beanFullName(): 'home-base.controller.menu';
            get $onionName(): 'home-base:menu';
            get $onionOptions(): IControllerOptionsMenu;
          }

        export interface ControllerPermission {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

          export interface ControllerPermission {
            get $beanFullName(): 'home-base.controller.permission';
            get $onionName(): 'home-base:permission';
            get $onionOptions(): IControllerOptionsPermission;
          } 
}
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerMenu } from '../controller/menu.ts';
// @ts-ignore ignore
import type { ControllerPermission } from '../controller/permission.ts';
declare module 'vona-module-home-base' {
  
    export interface IControllerOptionsMenu {
      actions?: TypeControllerOptionsActions<ControllerMenu>;
    }

    export interface IControllerOptionsPermission {
      actions?: TypeControllerOptionsActions<ControllerPermission>;
    }
}
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord{
        '/home/base/menu/:publicPath?': undefined;
    }

}

/** controller: end */
/** main: begin */
export * from '../main.ts';
/** main: end */
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
