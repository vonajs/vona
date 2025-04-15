import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
/** model: end */
/** authProvider: begin */
import type { IDecoratorEntityOptions } from 'vona-module-a-database';

import type { IDecoratorModelOptions } from 'vona-module-a-database';
import type { IAuthProviderOptionsSimple } from '../bean/authProvider.simple.ts';
/** authProvider: end */
/** authProvider: begin */
import type { AuthProviderSimple } from '../bean/authProvider.simple.ts';
/** bean: end */
/** bean: begin */
import type { BeanAuthSimple } from '../bean/bean.authSimple.ts';
import type { config } from '../config/config.ts';

/** entity: end */
/** entity: begin */
import type { EntityAuthSimple } from '../entity/authSimple.ts';
/** model: end */
/** model: begin */
import type { ModelAuthSimple } from '../model/authSimple.ts';
/** service: end */
/** service: begin */
import type { ServiceAuthSimple } from '../service/authSimple.ts';

/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';

import { Scope } from 'vona-module-a-bean';
import 'vona';
/** service: end */
/** service: begin */

import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/authProvider.simple.ts';
declare module 'vona-module-a-database' {

  export interface IEntityRecord {
    'a-authsimple:authSimple': IDecoratorEntityOptions;
  }

}
declare module 'vona-module-a-authsimple' {

}
export interface IModuleEntity {
  authSimple: EntityAuthSimple;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-authsimple' {

  export interface EntityAuthSimple {
    $column: <K extends keyof Omit<EntityAuthSimple, 'column' | 'columns' | 'table'>>(column: K) => K;
    $columns: <K extends keyof Omit<EntityAuthSimple, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** authProvider: end */
/** bean: begin */
export * from '../bean/bean.authSimple.ts';
declare module 'vona-module-a-database' {

  export interface IModelRecord {
    'a-authsimple:authSimple': IDecoratorModelOptions;
  }

}
declare module 'vona-module-a-authsimple' {

  export interface ModelAuthSimple {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
export interface IModuleModel {
  authSimple: ModelAuthSimple;
}
/** bean: end */
/** meta: begin */
export * from '../bean/meta.version.ts';
declare module 'vona-module-a-auth' {

  export interface IAuthProviderRecord {
    'a-authsimple:simple': IAuthProviderOptionsSimple;
  }

}
declare module 'vona-module-a-authsimple' {

  export interface AuthProviderSimple {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
export interface IModuleAuthProvider {
  simple: AuthProviderSimple;
}
/** service: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona' {

}
declare module 'vona-module-a-authsimple' {

  export interface BeanAuthSimple {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    authSimple: BeanAuthSimple;
  }
}
/** entity: begin */
export * from '../entity/authSimple.ts';
declare module 'vona' {

  export interface IMetaRecord {
    'a-authsimple:version': never;
  }

}
declare module 'vona-module-a-authsimple' {

  export interface MetaVersion {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/authSimple.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-authsimple:authSimple': never;
  }

}
declare module 'vona-module-a-authsimple' {

  export interface ServiceAuthSimple {
    /** @internal */
    get scope(): ScopeModuleAAuthsimple;
  }
}
export interface IModuleService {
  authSimple: ServiceAuthSimple;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-authsimple.service.authSimple': ServiceAuthSimple;
  }
}
/** meta: end */
/** service: begin */
export * from '../service/authSimple.ts';

@Scope()
export class ScopeModuleAAuthsimple extends BeanScopeBase {}

export interface ScopeModuleAAuthsimple {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  entity: IModuleEntity;
  model: IModuleModel;
  authProvider: IModuleAuthProvider;
  service: IModuleService;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-authsimple': ScopeModuleAAuthsimple;
  }

  export interface IBeanScopeContainer {
    authsimple: ScopeModuleAAuthsimple;
  }

  export interface IBeanScopeConfig {
    'a-authsimple': ReturnType<typeof config>;
  }

}

/** scope: end */
