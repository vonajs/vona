/* eslint-disable */
import type { TypeEntityMeta,TypeSymbolKeyFieldsMore } from 'vona-module-a-orm';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** entity: begin */
export * from '../entity/paypalRecord.tsx';
import type { IEntityOptionsPaypalRecord } from '../entity/paypalRecord.tsx';
import 'vona-module-a-orm';
declare module 'vona-module-a-orm' {
  
    export interface IEntityRecord {
      'a-paypal:paypalRecord': IEntityOptionsPaypalRecord;
    }

  
}
declare module 'vona-module-a-paypal' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityPaypalRecord } from '../entity/paypalRecord.tsx';
export interface IModuleEntity {
  'paypalRecord': EntityPaypalRecordMeta;
}
/** entity: end */
/** entity: begin */
export type EntityPaypalRecordTableName = 'paypalRecord';
export type EntityPaypalRecordMeta=TypeEntityMeta<EntityPaypalRecord,EntityPaypalRecordTableName>;
declare module 'vona-module-a-orm' {
  export interface ITableRecord {
    'paypalRecord': EntityPaypalRecordMeta;
  }
}
declare module 'vona-module-a-paypal' {
  
    export interface IEntityOptionsPaypalRecord {
      fields?: TypeEntityOptionsFields<EntityPaypalRecord, IEntityOptionsPaypalRecord[TypeSymbolKeyFieldsMore]>;
    }
}
/** entity: end */
/** bean: begin */
export * from '../bean/bean.paypal.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-paypal' {
  
        export interface BeanPaypal {
          /** @internal */
          get scope(): ScopeModuleAPaypal;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanPaypal } from '../bean/bean.paypal.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'paypal': BeanPaypal;
  }
}
/** bean: end */
/** meta: begin */
export * from '../bean/meta.version.ts';

import 'vona-module-a-meta';
declare module 'vona-module-a-meta' {
  
    export interface IMetaRecord {
      'a-paypal:version': never;
    }

  
}
declare module 'vona-module-a-paypal' {
  
        export interface MetaVersion {
          /** @internal */
          get scope(): ScopeModuleAPaypal;
        }

          export interface MetaVersion {
            get $beanFullName(): 'a-paypal.meta.version';
            get $onionName(): 'a-paypal:version';
            
          } 
}
/** meta: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** locale: begin */
import { locales } from './locales.ts';
/** locale: end */
/** error: begin */
export * from '../config/errors.ts';
import type { errors } from '../config/errors.ts';
/** error: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig, type TypeModuleErrors, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAPaypal extends BeanScopeBase {}

export interface ScopeModuleAPaypal {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
error: TypeModuleErrors<typeof errors>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
entity: IModuleEntity;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-paypal': ScopeModuleAPaypal;
  }

  export interface IBeanScopeContainer {
    paypal: ScopeModuleAPaypal;
  }
  
  export interface IBeanScopeConfig {
    'a-paypal': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-paypal': (typeof locales)[TypeLocaleBase];
  }

  export interface IBeanScopeErrors {
    'a-paypal': typeof errors;
  }
}
/** scope: end */
