/** meta: begin */
export * from '../bean/meta.printApiPath.js';

import 'vona';
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
/** meta: end */
/** controller: begin */
export * from '../controller/swagger.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-swagger:swagger': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-swagger' {
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
/** controller: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleASwagger extends BeanScopeBase {}

export interface ScopeModuleASwagger {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'vona';
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
