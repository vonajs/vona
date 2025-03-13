import type { BeanScopeUtil } from 'vona';
import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import type { IDecoratorModelOptions } from 'vona-module-a-database';
/** bean: end */
/** bean: begin */
import type { BeanAuth } from '../bean/bean.auth.ts';

import type { BeanAuthProvider } from '../bean/bean.authProvider.ts';
/** meta: end */
/** meta redlock: begin */
import type { MetaRedlock } from '../bean/meta.redlock.ts';
/** entity: end */
/** entity: begin */
import type { EntityAuth } from '../entity/auth.ts';

import type { EntityAuthProvider } from '../entity/authProvider.ts';
/** model: end */
/** model: begin */
import type { ModelAuth } from '../model/auth.ts';
import type { ModelAuthProvider } from '../model/authProvider.ts';
import type { ServiceAuthenticator } from '../service/authenticator.ts';

/** service: end */
/** service: begin */
import type { ServiceAuthInnerAdapter } from '../service/authInnerAdapter.ts';
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
export * from '../bean/bean.authProvider.ts';
declare module 'vona' {

}
declare module 'vona-module-a-auth' {

  export interface BeanAuth {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface BeanAuthProvider {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    auth: BeanAuth;
    authProvider: BeanAuthProvider;
  }
}
/** model: end */
/** meta: begin */
export * from '../bean/meta.redlock.ts';
export * from '../bean/meta.version.ts';
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
/** bean: end */
/** entity: begin */
export * from '../entity/auth.ts';
export * from '../entity/authProvider.ts';
declare module 'vona-module-a-database' {

  export interface IModelRecord {
    'a-auth:auth': IDecoratorModelOptions;
    'a-auth:authProvider': IDecoratorModelOptions;
  }

}
declare module 'vona-module-a-auth' {

  export interface ModelAuth {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface ModelAuthProvider {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
export interface IModuleModel {
  auth: ModelAuth;
  authProvider: ModelAuthProvider;
}
/** entity: end */
/** model: begin */
export * from '../model/auth.ts';
export * from '../model/authProvider.ts';
declare module 'vona' {

  export interface IMetaRecord {
    'a-auth:redlock': never;
    'a-auth:version': never;
  }

}
declare module 'vona-module-a-auth' {

  export interface MetaRedlock {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface MetaVersion {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
export * from '../service/authenticator.ts';
/** meta redlock: end */
/** service: begin */
export * from '../service/authInnerAdapter.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-auth:authInnerAdapter': never;
    'a-auth:authenticator': never;
  }

}
declare module 'vona-module-a-auth' {

  export interface ServiceAuthInnerAdapter {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }

  export interface ServiceAuthenticator {
    /** @internal */
    get scope(): ScopeModuleAAuth;
  }
}
export interface IModuleService {
  authInnerAdapter: ServiceAuthInnerAdapter;
  authenticator: ServiceAuthenticator;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-auth.service.authInnerAdapter': ServiceAuthInnerAdapter;
    'a-auth.service.authenticator': ServiceAuthenticator;
  }
}

@Scope()
export class ScopeModuleAAuth extends BeanScopeBase {}

export interface ScopeModuleAAuth {
  util: BeanScopeUtil;
  entity: IModuleEntity;
  model: IModuleModel;
  redlock: MetaRedlock;
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
