import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanJwt } from '../bean/bean.jwt.ts';
import type { config } from '../config/config.ts';

/** service: end */
/** service: begin */
import type { ServiceJwtClient } from '../service/jwtClient.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** service: end */
/** service: begin */

/** bean: begin */
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.jwt.ts';
declare module 'vona' {

}
declare module 'vona-module-a-jwt' {

  export interface BeanJwt {
    /** @internal */
    get scope(): ScopeModuleAJwt;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    jwt: BeanJwt;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-jwt:jwtClient': never;
  }

}
declare module 'vona-module-a-jwt' {

  export interface ServiceJwtClient {
    /** @internal */
    get scope(): ScopeModuleAJwt;
  }
}
export interface IModuleService {
  jwtClient: ServiceJwtClient;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-jwt.service.jwtClient': ServiceJwtClient;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/jwtClient.ts';

@Scope()
export class ScopeModuleAJwt extends BeanScopeBase {}

export interface ScopeModuleAJwt {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-jwt': ScopeModuleAJwt;
  }

  export interface IBeanScopeContainer {
    jwt: ScopeModuleAJwt;
  }

  export interface IBeanScopeConfig {
    'a-jwt': ReturnType<typeof config>;
  }

}

/** scope: end */
