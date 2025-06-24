/* eslint-disable */
import type { TypeMetaEntity } from 'vona-module-a-database';
import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** entity: begin */
export * from '../entity/auth.ts';
export * from '../entity/authProvider.ts';
import type { IEntityOptionsAuth } from '../entity/auth.ts';
import type { IEntityOptionsAuthProvider } from '../entity/authProvider.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IEntityRecord {
      'a-auth:auth': Omit<IEntityOptionsAuth, '_fieldsMore_'>;
'a-auth:authProvider': Omit<IEntityOptionsAuthProvider, '_fieldsMore_'>;
    }

  
}
declare module 'vona-module-a-auth' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityAuth } from '../entity/auth.ts';
import type { EntityAuthProvider } from '../entity/authProvider.ts';
export interface IModuleEntity {
  'auth': TypeMetaEntity<EntityAuth,EntityAuthTableName>;
'authProvider': TypeMetaEntity<EntityAuthProvider,EntityAuthProviderTableName>;
}
/** entity: end */
/** entity: begin */
export type EntityAuthTableName = 'aAuth';
export type EntityAuthProviderTableName = 'aAuthProvider';
declare module 'vona-module-a-auth' {
  
    export interface IEntityOptionsAuth {
      fields?: TypeEntityOptionsFields<EntityAuth, IEntityOptionsAuth['_fieldsMore_']>;
    }

    export interface IEntityOptionsAuthProvider {
      fields?: TypeEntityOptionsFields<EntityAuthProvider, IEntityOptionsAuthProvider['_fieldsMore_']>;
    }
}
/** entity: end */
/** model: begin */
export * from '../model/auth.ts';
export * from '../model/authProvider.ts';

import { type IDecoratorModelOptions } from 'vona-module-a-database';
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
/** model: end */
/** model: begin */
import type { ModelAuth } from '../model/auth.ts';
import type { ModelAuthProvider } from '../model/authProvider.ts';
export interface IModuleModel {
  'auth': ModelAuth;
'authProvider': ModelAuthProvider;
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.auth.ts';
export * from '../bean/bean.authProvider.ts';

import 'vona';
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
/** bean: end */
/** bean: begin */
import type { BeanAuth } from '../bean/bean.auth.ts';
import type { BeanAuthProvider } from '../bean/bean.authProvider.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'auth': BeanAuth;
'authProvider': BeanAuthProvider;
  }
}
/** bean: end */
/** event: begin */
export * from '../bean/event.accountMigration.ts';
export * from '../bean/event.issuePassport.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-auth' {
  
        export interface EventAccountMigration {
          /** @internal */
          get scope(): ScopeModuleAAuth;
        }

        export interface EventIssuePassport {
          /** @internal */
          get scope(): ScopeModuleAAuth;
        } 
}
/** event: end */
/** event: begin */
import type { EventAccountMigration } from '../bean/event.accountMigration.ts';
import type { EventIssuePassport } from '../bean/event.issuePassport.ts';
export interface IModuleEvent {
  'accountMigration': EventAccountMigration;
'issuePassport': EventIssuePassport;
}
/** event: end */
/** event: begin */
import type { TypeEventAccountMigrationData, TypeEventAccountMigrationResult } from '../bean/event.accountMigration.ts';
import type { TypeEventIssuePassportData, TypeEventIssuePassportResult } from '../bean/event.issuePassport.ts';
import type { EventOn } from 'vona-module-a-event'; 
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-auth:accountMigration': EventOn<TypeEventAccountMigrationData, TypeEventAccountMigrationResult>;
'a-auth:issuePassport': EventOn<TypeEventIssuePassportData, TypeEventIssuePassportResult>;
  }
}
/** event: end */
/** meta: begin */
export * from '../bean/meta.printTip.ts';
export * from '../bean/meta.redlock.ts';
export * from '../bean/meta.version.ts';

import 'vona';
declare module 'vona' {
  
    export interface IMetaRecord {
      'a-auth:printTip': never;
'a-auth:redlock': never;
'a-auth:version': never;
    }

  
}
declare module 'vona-module-a-auth' {
  
        export interface MetaPrintTip {
          /** @internal */
          get scope(): ScopeModuleAAuth;
        }

        export interface MetaRedlock {
          /** @internal */
          get scope(): ScopeModuleAAuth;
        }

        export interface MetaVersion {
          /** @internal */
          get scope(): ScopeModuleAAuth;
        } 
}
/** meta: end */
/** meta redlock: begin */
import type { MetaRedlock } from '../bean/meta.redlock.ts';
/** meta redlock: end */
/** service: begin */
export * from '../service/auth.ts';
export * from '../service/authInnerAdapter.ts';

import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IServiceRecord {
      'a-auth:auth': never;
'a-auth:authInnerAdapter': never;
    }

  
}
declare module 'vona-module-a-auth' {
  
        export interface ServiceAuth {
          /** @internal */
          get scope(): ScopeModuleAAuth;
        }

        export interface ServiceAuthInnerAdapter {
          /** @internal */
          get scope(): ScopeModuleAAuth;
        } 
}
/** service: end */
/** service: begin */
import type { ServiceAuth } from '../service/auth.ts';
import type { ServiceAuthInnerAdapter } from '../service/authInnerAdapter.ts';
export interface IModuleService {
  'auth': ServiceAuth;
'authInnerAdapter': ServiceAuthInnerAdapter;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-auth.service.auth': ServiceAuth;
'a-auth.service.authInnerAdapter': ServiceAuthInnerAdapter;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/passport.ts';
import type { IControllerOptionsPassport } from '../controller/passport.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'a-auth:passport': IControllerOptionsPassport;
    }

  
}
declare module 'vona-module-a-auth' {
  
        export interface ControllerPassport {
          /** @internal */
          get scope(): ScopeModuleAAuth;
        } 
}
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerPassport } from '../controller/passport.ts';
declare module 'vona-module-a-auth' {
  
    export interface IControllerOptionsPassport {
      actions?: TypeControllerOptionsActions<ControllerPassport>;
    }
}
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord{
        '/auth/passport/callback': undefined;
    }

}
/** controller: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';
export const locales = {
  'en-us': locale_en_us,
'zh-cn': locale_zh_cn,
};
/** locale: end */
/** error: begin */
export * from '../config/errors.ts';
import type { Errors } from '../config/errors.ts';
/** error: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig, type TypeModuleErrors, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAAuth extends BeanScopeBase {}

export interface ScopeModuleAAuth {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
error: TypeModuleErrors<typeof Errors>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
entity: IModuleEntity;
model: IModuleModel;
event: IModuleEvent;
redlock: MetaRedlock;
service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-auth': ScopeModuleAAuth;
  }

  export interface IBeanScopeContainer {
    auth: ScopeModuleAAuth;
  }
  
  export interface IBeanScopeConfig {
    'a-auth': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-auth': (typeof locales)[TypeLocaleBase];
  }
}

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-auth::${K}` {
  return `a-auth::${key}`;
}
/** scope: end */
