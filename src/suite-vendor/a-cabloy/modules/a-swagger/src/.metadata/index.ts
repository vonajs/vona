/** startup: begin */
export * from '../bean/startup.outputSwaggerApi.js';

import { IDecoratorStartupOptions } from 'vona-module-a-startup';
declare module 'vona-module-a-startup' {
  export interface IStartupRecord {
    'a-swagger:outputSwaggerApi': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-a-swagger' {
  export interface StartupOutputSwaggerApi {
    /** @internal */
    get scope(): ScopeModuleASwagger;
  }
}
/** startup: end */
/** service: begin */
export * from '../service/swagger.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-swagger:swagger': never;
  }
}
declare module 'vona-module-a-swagger' {
  export interface ServiceSwagger {
    /** @internal */
    get scope(): ScopeModuleASwagger;
  }
}
/** service: end */
/** service: begin */
import { ServiceSwagger } from '../service/swagger.js';
export interface IModuleService {
  swagger: ServiceSwagger;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-swagger.service.swagger': ServiceSwagger;
  }
}
/** service: end */
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
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleASwagger extends BeanScopeBase {}

export interface ScopeModuleASwagger {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
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
