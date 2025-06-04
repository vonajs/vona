import type { BeanScopeUtil } from 'vona';

import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
import type { IControllerOptionsMenu } from '../controller/menu.ts';
/** service: end */
/** service: begin */

/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerMenu } from '../controller/menu.ts';
/** service: end */
/** service: begin */
import type { ServiceMenu } from '../service/menu.ts';
/** controller: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';
import 'vona';

import 'vona';
/** service: end */
/** controller: begin */
export * from '../controller/menu.ts';
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
export interface IModuleService {
  menu: ServiceMenu;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'home-base.service.menu': ServiceMenu;
  }
}
/** service: begin */
export * from '../service/menu.ts';
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
declare module 'vona-module-home-base' {

  export interface IControllerOptionsMenu {
    actions?: TypeControllerOptionsActions<ControllerMenu>;
  }
}
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord {
    '/home/base/menu/:publicPath?': undefined;
  }

}

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase {
  util: BeanScopeUtil;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }

  export interface IBeanScopeContainer {
    homeBase: ScopeModuleHomeBase;
  }

}

/** scope: end */
