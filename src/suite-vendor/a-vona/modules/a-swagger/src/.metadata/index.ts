import type { BeanScopeUtil, TypeModuleConfig } from 'vona';

import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import type { config } from '../config/config.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** meta: begin */
import 'vona';

import 'vona';

export * from '../bean/meta.printTip.ts';
declare module 'vona' {

  export interface IMetaRecord {
    'a-swagger:printTip': never;
  }

}
declare module 'vona-module-a-swagger' {

  export interface MetaPrintTip {
    /** @internal */
    get scope(): ScopeModuleASwagger;
  }
}
/** controller: end */
/** config: begin */
export * from '../config/config.ts';
/** meta: end */
/** controller: begin */
export * from '../controller/rapidoc.ts';
declare module 'vona-module-a-web' {

  export interface IControllerRecord {
    'a-swagger:rapidoc': IDecoratorControllerOptions;
    'a-swagger:swagger': IDecoratorControllerOptions;
  }

}
declare module 'vona-module-a-swagger' {

  export interface ControllerRapidoc {
    /** @internal */
    get scope(): ScopeModuleASwagger;
  }

  export interface ControllerSwagger {
    /** @internal */
    get scope(): ScopeModuleASwagger;
  }
}
/** controller: end */
/** controller: begin */
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord {
    '//rapidoc': undefined;
    '//swagger': undefined;
    '//swagger/json': undefined;
  }

}
export * from '../controller/swagger.ts';

@Scope()
export class ScopeModuleASwagger extends BeanScopeBase {}

export interface ScopeModuleASwagger {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-swagger': ScopeModuleASwagger;
  }

  export interface IBeanScopeContainer {
    swagger: ScopeModuleASwagger;
  }

  export interface IBeanScopeConfig {
    'a-swagger': ReturnType<typeof config>;
  }

}

/** scope: end */
