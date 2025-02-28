import type { TypeModuleConfig } from 'vona';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';

/** config: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';
import { config } from '../config/config.ts';
/** meta: begin */
import 'vona';

import 'vona';

export * from '../bean/meta.printApiPath.ts';
declare module 'vona' {

  export interface IMetaRecord {
    'a-swagger:printApiPath': never;
  }

}
declare module 'vona-module-a-swagger' {

  export interface MetaPrintApiPath {
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
    '//swagger': '//swagger';
    '//swagger/json': '//swagger/json';
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
