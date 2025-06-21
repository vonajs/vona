import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
import type { TypeMetaEntity } from 'vona-module-a-database';
import type { IDecoratorModelOptions } from 'vona-module-a-database';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
import type { IAuthProviderOptionsSimple } from '../bean/authProvider.simple.ts';

/** authProvider: end */
/** authProvider: begin */
import type { AuthProviderSimple } from '../bean/authProvider.simple.ts';
/** bean: end */
/** bean: begin */
import type { BeanAuthSimple } from '../bean/bean.authSimple.ts';
import type { config } from '../config/config.ts';
import type { IDtoOptionsAuthSimple } from '../dto/authSimple.ts';
/** dto: end */
/** dto: begin */
import type { DtoAuthSimple } from '../dto/authSimple.ts';

import type { IEntityOptionsAuthSimple } from '../entity/authSimple.ts';
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
import 'vona';

import 'vona';
import 'vona';
/** service: end */
/** service: begin */

import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';
/** model: end */
/** authProvider: begin */
export * from '../bean/authProvider.simple.ts';
declare module 'vona-module-a-database' {

  export interface IEntityRecord {
    'a-authsimple:authSimple': Omit<IEntityOptionsAuthSimple, '_fieldsMore_'>;
  }

}
declare module 'vona-module-a-authsimple' {

}
export interface IModuleEntity {
  authSimple: TypeMetaEntity<EntityAuthSimple, EntityAuthSimpleTableName>;
}
/** entity: end */
/** entity: begin */
export type EntityAuthSimpleTableName = 'aAuthSimple';
declare module 'vona-module-a-authsimple' {

  export interface IEntityOptionsAuthSimple {
    fields?: TypeEntityOptionsFields<EntityAuthSimple, IEntityOptionsAuthSimple['_fieldsMore_']>;
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
/** meta: end */
/** dto: begin */
export * from '../dto/authSimple.ts';
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
/** entity: begin */
export * from '../entity/authSimple.ts';
declare module 'vona-module-a-web' {

  export interface IDtoRecord {
    'a-authsimple:authSimple': Omit<IDtoOptionsAuthSimple, '_fieldsMore_'>;
  }

}
declare module 'vona-module-a-authsimple' {

}
declare module 'vona-module-a-authsimple' {

  export interface IDtoOptionsAuthSimple {
    fields?: TypeEntityOptionsFields<DtoAuthSimple, IDtoOptionsAuthSimple['_fieldsMore_']>;
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
/** dto: end */
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
