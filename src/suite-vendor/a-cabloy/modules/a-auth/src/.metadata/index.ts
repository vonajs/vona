import type { BeanScopeUtil } from 'vona';
import type { IDecoratorEntityOptions } from 'vona-module-a-database';
/** bean: end */
/** bean: begin */
import type { BeanAuth } from '../bean/bean.auth.ts';

/** entity: end */
/** entity: begin */
import type { EntityAuth } from '../entity/auth.ts';
import type { EntityAuthProvider } from '../entity/authProvider.ts';
/** service: end */
/** service: begin */
import type { ServiceAuth } from '../service/auth.ts';
import type { ServiceAuthenticator } from '../service/authenticator.ts';

/** service: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';

import { Scope } from 'vona-module-a-bean';
/** bean: begin */
import 'vona';
import 'vona';
/** service: end */
/** service: begin */

import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.auth.ts';
declare module 'vona' {

}
declare module 'vona-module-a-auth' {

  export interface BeanAuth {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    auth: BeanAuth;
  }
}
/** entity: end */
/** meta: begin */
export * from '../bean/meta.version.ts';
/** bean: end */
/** entity: begin */
export * from '../entity/auth.ts';
declare module 'vona-module-a-database' {

  export interface IEntityRecord {
    'a-auth:auth': IDecoratorEntityOptions;
    'a-auth:authProvider': IDecoratorEntityOptions;
  }

}
declare module 'vona-module-a-auth' {

}
export interface IModuleEntity {
  auth: EntityAuth;
  authProvider: EntityAuthProvider;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-auth' {

  export interface EntityAuth {
    column: <K extends keyof Omit<EntityAuth, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAuth, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityAuthProvider {
    column: <K extends keyof Omit<EntityAuthProvider, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAuthProvider, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
export * from '../entity/authProvider.ts';
declare module 'vona' {

  export interface IMetaRecord {
    'a-auth:version': never;
  }

}
declare module 'vona-module-a-auth' {

  export interface MetaVersion {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
/** meta: end */
/** service: begin */
export * from '../service/auth.ts';
export * from '../service/authenticator.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-auth:auth': never;
    'a-auth:authenticator': never;
  }

}
declare module 'vona-module-a-auth' {

  export interface ServiceAuth {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface ServiceAuthenticator {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
export interface IModuleService {
  auth: ServiceAuth;
  authenticator: ServiceAuthenticator;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-auth.service.auth': ServiceAuth;
    'a-auth.service.authenticator': ServiceAuthenticator;
  }
}

@Scope()
export class ScopeModuleAAuth extends BeanScopeBase {}

export interface ScopeModuleAAuth {
  util: BeanScopeUtil;
  entity: IModuleEntity;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-auth': ScopeModuleAAuth;
  }

  export interface IBeanScopeContainer {
    auth: ScopeModuleAAuth;
  }

}

/** scope: end */
