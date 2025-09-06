/* eslint-disable */
import type { TypeEntityMeta,TypeSymbolKeyFieldsMore } from 'vona-module-a-orm';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** entity: begin */
export * from '../entity/mail.ts';
import type { IEntityOptionsMail } from '../entity/mail.ts';
import 'vona';
declare module 'vona-module-a-orm' {
  
    export interface IEntityRecord {
      'a-mail:mail': IEntityOptionsMail;
    }

  
}
declare module 'vona-module-a-mail' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityMail } from '../entity/mail.ts';
export interface IModuleEntity {
  'mail': EntityMailMeta;
}
/** entity: end */
/** entity: begin */
export type EntityMailTableName = 'mail';
export type EntityMailMeta=TypeEntityMeta<EntityMail,EntityMailTableName>;
declare module 'vona-module-a-orm' {
  export interface ITableRecord {
    'mail': never;
  }
}
declare module 'vona-module-a-mail' {
  
    export interface IEntityOptionsMail {
      fields?: TypeEntityOptionsFields<EntityMail, IEntityOptionsMail[TypeSymbolKeyFieldsMore]>;
    }
}
/** entity: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAMail extends BeanScopeBase {}

export interface ScopeModuleAMail {
  util: BeanScopeUtil;
entity: IModuleEntity;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-mail': ScopeModuleAMail;
  }

  export interface IBeanScopeContainer {
    mail: ScopeModuleAMail;
  }
  
  

  
}

/** scope: end */
