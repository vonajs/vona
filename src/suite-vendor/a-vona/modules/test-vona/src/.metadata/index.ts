/* eslint-disable */
import type { TypeSymbolKeyFieldsMore } from 'vona-module-a-database';
import type { TypeEntityMeta } from 'vona-module-a-database';
import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';
/** aop: begin */
export * from '../bean/aop.regExp.ts';
export * from '../bean/aop.simple.ts';

import { type IDecoratorAopOptions } from 'vona-module-a-aspect';
declare module 'vona-module-a-aspect' {
  
    export interface IAopRecord {
      'test-vona:regExp': IDecoratorAopOptions;
'test-vona:simple': IDecoratorAopOptions;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface AopRegExp {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface AopRegExp {
            get $beanFullName(): 'test-vona.aop.regExp';
            get $onionName(): 'test-vona:regExp';
          }

        export interface AopSimple {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface AopSimple {
            get $beanFullName(): 'test-vona.aop.simple';
            get $onionName(): 'test-vona:simple';
          } 
}
/** aop: end */
/** aopMethod: begin */
export * from '../bean/aopMethod.test.ts';
import type { IAopMethodOptionsTest } from '../bean/aopMethod.test.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IAopMethodRecord {
      'test-vona:test': IAopMethodOptionsTest;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface AopMethodTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface AopMethodTest {
            get $beanFullName(): 'test-vona.aopMethod.test';
            get $onionName(): 'test-vona:test';
          } 
}
/** aopMethod: end */
/** entity: begin */
export * from '../entity/post.ts';
export * from '../entity/postContent.ts';
export * from '../entity/role.ts';
export * from '../entity/roleUser.ts';
export * from '../entity/test.ts';
export * from '../entity/user.ts';
import type { IEntityOptionsPost } from '../entity/post.ts';
import type { IEntityOptionsPostContent } from '../entity/postContent.ts';
import type { IEntityOptionsRole } from '../entity/role.ts';
import type { IEntityOptionsRoleUser } from '../entity/roleUser.ts';
import type { IEntityOptionsTest } from '../entity/test.ts';
import type { IEntityOptionsUser } from '../entity/user.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IEntityRecord {
      'test-vona:post': IEntityOptionsPost;
'test-vona:postContent': IEntityOptionsPostContent;
'test-vona:role': IEntityOptionsRole;
'test-vona:roleUser': IEntityOptionsRoleUser;
'test-vona:test': IEntityOptionsTest;
'test-vona:user': IEntityOptionsUser;
    }

  
}
declare module 'vona-module-test-vona' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityPost } from '../entity/post.ts';
import type { EntityPostContent } from '../entity/postContent.ts';
import type { EntityRole } from '../entity/role.ts';
import type { EntityRoleUser } from '../entity/roleUser.ts';
import type { EntityTest } from '../entity/test.ts';
import type { EntityUser } from '../entity/user.ts';
export interface IModuleEntity {
  'post': EntityPostMeta;
'postContent': EntityPostContentMeta;
'role': EntityRoleMeta;
'roleUser': EntityRoleUserMeta;
'test': EntityTestMeta;
'user': EntityUserMeta;
}
/** entity: end */
/** entity: begin */
export type EntityPostTableName = 'testVonaPost';
export type EntityPostContentTableName = 'testVonaPostContent';
export type EntityRoleTableName = 'testVonaRole';
export type EntityRoleUserTableName = 'testVonaRoleUser';
export type EntityTestTableName = 'testVonaTest';
export type EntityUserTableName = 'testVonaUser';
export type EntityPostMeta=TypeEntityMeta<EntityPost,EntityPostTableName>;
export type EntityPostContentMeta=TypeEntityMeta<EntityPostContent,EntityPostContentTableName>;
export type EntityRoleMeta=TypeEntityMeta<EntityRole,EntityRoleTableName>;
export type EntityRoleUserMeta=TypeEntityMeta<EntityRoleUser,EntityRoleUserTableName>;
export type EntityTestMeta=TypeEntityMeta<EntityTest,EntityTestTableName>;
export type EntityUserMeta=TypeEntityMeta<EntityUser,EntityUserTableName>;
declare module 'vona-module-a-database' {
  export interface ITableRecord {
    'testVonaPost': never;
'testVonaPostContent': never;
'testVonaRole': never;
'testVonaRoleUser': never;
'testVonaTest': never;
'testVonaUser': never;
  }
}
declare module 'vona-module-test-vona' {
  
    export interface IEntityOptionsPost {
      fields?: TypeEntityOptionsFields<EntityPost, IEntityOptionsPost[TypeSymbolKeyFieldsMore]>;
    }

    export interface IEntityOptionsPostContent {
      fields?: TypeEntityOptionsFields<EntityPostContent, IEntityOptionsPostContent[TypeSymbolKeyFieldsMore]>;
    }

    export interface IEntityOptionsRole {
      fields?: TypeEntityOptionsFields<EntityRole, IEntityOptionsRole[TypeSymbolKeyFieldsMore]>;
    }

    export interface IEntityOptionsRoleUser {
      fields?: TypeEntityOptionsFields<EntityRoleUser, IEntityOptionsRoleUser[TypeSymbolKeyFieldsMore]>;
    }

    export interface IEntityOptionsTest {
      fields?: TypeEntityOptionsFields<EntityTest, IEntityOptionsTest[TypeSymbolKeyFieldsMore]>;
    }

    export interface IEntityOptionsUser {
      fields?: TypeEntityOptionsFields<EntityUser, IEntityOptionsUser[TypeSymbolKeyFieldsMore]>;
    }
}
/** entity: end */
/** model: begin */
export * from '../model/post.ts';
export * from '../model/postContent.ts';
export * from '../model/role.ts';
export * from '../model/roleUser.ts';
export * from '../model/test.ts';
export * from '../model/testDynamicTable.ts';
export * from '../model/user.ts';
import type { IModelOptionsPost } from '../model/post.ts';
import type { IModelOptionsPostContent } from '../model/postContent.ts';
import type { IModelOptionsRole } from '../model/role.ts';
import type { IModelOptionsRoleUser } from '../model/roleUser.ts';
import type { IModelOptionsTest } from '../model/test.ts';
import type { IModelOptionsTestDynamicTable } from '../model/testDynamicTable.ts';
import type { IModelOptionsUser } from '../model/user.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IModelRecord {
      'test-vona:post': IModelOptionsPost;
'test-vona:postContent': IModelOptionsPostContent;
'test-vona:role': IModelOptionsRole;
'test-vona:roleUser': IModelOptionsRoleUser;
'test-vona:test': IModelOptionsTest;
'test-vona:testDynamicTable': IModelOptionsTestDynamicTable;
'test-vona:user': IModelOptionsUser;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface ModelPost {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ModelPost {
            get $beanFullName(): 'test-vona.model.post';
            get $onionName(): 'test-vona:post';
          }

        export interface ModelPostContent {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ModelPostContent {
            get $beanFullName(): 'test-vona.model.postContent';
            get $onionName(): 'test-vona:postContent';
          }

        export interface ModelRole {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ModelRole {
            get $beanFullName(): 'test-vona.model.role';
            get $onionName(): 'test-vona:role';
          }

        export interface ModelRoleUser {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ModelRoleUser {
            get $beanFullName(): 'test-vona.model.roleUser';
            get $onionName(): 'test-vona:roleUser';
          }

        export interface ModelTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ModelTest {
            get $beanFullName(): 'test-vona.model.test';
            get $onionName(): 'test-vona:test';
          }

        export interface ModelTestDynamicTable {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ModelTestDynamicTable {
            get $beanFullName(): 'test-vona.model.testDynamicTable';
            get $onionName(): 'test-vona:testDynamicTable';
          }

        export interface ModelUser {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ModelUser {
            get $beanFullName(): 'test-vona.model.user';
            get $onionName(): 'test-vona:user';
          } 
}
/** model: end */
/** model: begin */
import type { ModelPost } from '../model/post.ts';
import type { ModelPostContent } from '../model/postContent.ts';
import type { ModelRole } from '../model/role.ts';
import type { ModelRoleUser } from '../model/roleUser.ts';
import type { ModelTest } from '../model/test.ts';
import type { ModelTestDynamicTable } from '../model/testDynamicTable.ts';
import type { ModelUser } from '../model/user.ts';
export interface IModuleModel {
  'post': ModelPost;
'postContent': ModelPostContent;
'role': ModelRole;
'roleUser': ModelRoleUser;
'test': ModelTest;
'testDynamicTable': ModelTestDynamicTable;
'user': ModelUser;
}
/** model: end */
/** model: begin */
import type { IModelCountParams, IModelGetOptions, IModelMethodOptions, IModelMethodOptionsGeneral, IModelClassRecord, IModelSelectParams, TableIdentity, TypeModelRelationResult, TypeModelWhere } from 'vona-module-a-database';
import { SymbolKeyEntity, SymbolKeyEntityMeta, SymbolKeyModelOptions } from 'vona-module-a-database';
declare module 'vona-module-test-vona' {
  export interface ModelPost {
      [SymbolKeyEntity]: EntityPost;
      [SymbolKeyEntityMeta]: EntityPostMeta;
      [SymbolKeyModelOptions]: IModelOptionsPost;
      get<T extends IModelGetOptions<EntityPost,ModelPost>>(where: TypeModelWhere<EntityPost>, options?: T): Promise<TypeModelRelationResult<EntityPost, ModelPost, T> | undefined>;
      mget<T extends IModelGetOptions<EntityPost,ModelPost>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityPost, ModelPost, T>[]>;
      select<T extends IModelSelectParams<EntityPost,ModelPost,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityPost, ModelPost, T>[]>;
      count<T extends IModelCountParams<EntityPost,ModelPost,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
export interface ModelPostContent {
      [SymbolKeyEntity]: EntityPostContent;
      [SymbolKeyEntityMeta]: EntityPostContentMeta;
      [SymbolKeyModelOptions]: IModelOptionsPostContent;
      get<T extends IModelGetOptions<EntityPostContent,ModelPostContent>>(where: TypeModelWhere<EntityPostContent>, options?: T): Promise<TypeModelRelationResult<EntityPostContent, ModelPostContent, T> | undefined>;
      mget<T extends IModelGetOptions<EntityPostContent,ModelPostContent>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityPostContent, ModelPostContent, T>[]>;
      select<T extends IModelSelectParams<EntityPostContent,ModelPostContent,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityPostContent, ModelPostContent, T>[]>;
      count<T extends IModelCountParams<EntityPostContent,ModelPostContent,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
export interface ModelRole {
      [SymbolKeyEntity]: EntityRole;
      [SymbolKeyEntityMeta]: EntityRoleMeta;
      [SymbolKeyModelOptions]: IModelOptionsRole;
      get<T extends IModelGetOptions<EntityRole,ModelRole>>(where: TypeModelWhere<EntityRole>, options?: T): Promise<TypeModelRelationResult<EntityRole, ModelRole, T> | undefined>;
      mget<T extends IModelGetOptions<EntityRole,ModelRole>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityRole, ModelRole, T>[]>;
      select<T extends IModelSelectParams<EntityRole,ModelRole,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityRole, ModelRole, T>[]>;
      count<T extends IModelCountParams<EntityRole,ModelRole,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
export interface ModelRoleUser {
      [SymbolKeyEntity]: EntityRoleUser;
      [SymbolKeyEntityMeta]: EntityRoleUserMeta;
      [SymbolKeyModelOptions]: IModelOptionsRoleUser;
      get<T extends IModelGetOptions<EntityRoleUser,ModelRoleUser>>(where: TypeModelWhere<EntityRoleUser>, options?: T): Promise<TypeModelRelationResult<EntityRoleUser, ModelRoleUser, T> | undefined>;
      mget<T extends IModelGetOptions<EntityRoleUser,ModelRoleUser>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityRoleUser, ModelRoleUser, T>[]>;
      select<T extends IModelSelectParams<EntityRoleUser,ModelRoleUser,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityRoleUser, ModelRoleUser, T>[]>;
      count<T extends IModelCountParams<EntityRoleUser,ModelRoleUser,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
export interface ModelTest {
      [SymbolKeyEntity]: EntityTest;
      [SymbolKeyEntityMeta]: EntityTestMeta;
      [SymbolKeyModelOptions]: IModelOptionsTest;
      get<T extends IModelGetOptions<EntityTest,ModelTest>>(where: TypeModelWhere<EntityTest>, options?: T): Promise<TypeModelRelationResult<EntityTest, ModelTest, T> | undefined>;
      mget<T extends IModelGetOptions<EntityTest,ModelTest>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityTest, ModelTest, T>[]>;
      select<T extends IModelSelectParams<EntityTest,ModelTest,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityTest, ModelTest, T>[]>;
      count<T extends IModelCountParams<EntityTest,ModelTest,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
export interface ModelTestDynamicTable {
      [SymbolKeyEntity]: EntityTest;
      [SymbolKeyEntityMeta]: EntityTestMeta;
      [SymbolKeyModelOptions]: IModelOptionsTestDynamicTable;
      get<T extends IModelGetOptions<EntityTest,ModelTestDynamicTable>>(where: TypeModelWhere<EntityTest>, options?: T): Promise<TypeModelRelationResult<EntityTest, ModelTestDynamicTable, T> | undefined>;
      mget<T extends IModelGetOptions<EntityTest,ModelTestDynamicTable>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityTest, ModelTestDynamicTable, T>[]>;
      select<T extends IModelSelectParams<EntityTest,ModelTestDynamicTable,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityTest, ModelTestDynamicTable, T>[]>;
      count<T extends IModelCountParams<EntityTest,ModelTestDynamicTable,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
export interface ModelUser {
      [SymbolKeyEntity]: EntityUser;
      [SymbolKeyEntityMeta]: EntityUserMeta;
      [SymbolKeyModelOptions]: IModelOptionsUser;
      get<T extends IModelGetOptions<EntityUser,ModelUser>>(where: TypeModelWhere<EntityUser>, options?: T): Promise<TypeModelRelationResult<EntityUser, ModelUser, T> | undefined>;
      mget<T extends IModelGetOptions<EntityUser,ModelUser>>(ids: TableIdentity[], options?: T): Promise<TypeModelRelationResult<EntityUser, ModelUser, T>[]>;
      select<T extends IModelSelectParams<EntityUser,ModelUser,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptions, modelJoins?: ModelJoins): Promise<TypeModelRelationResult<EntityUser, ModelUser, T>[]>;
      count<T extends IModelCountParams<EntityUser,ModelUser,ModelJoins>, ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined>(params?: T, options?: IModelMethodOptionsGeneral, modelJoins?: ModelJoins): Promise<BigNumber>;
    }
}
declare module 'vona-module-a-database' {
  export interface IModelClassRecord {
    'test-vona:post': ModelPost;
'test-vona:postContent': ModelPostContent;
'test-vona:role': ModelRole;
'test-vona:roleUser': ModelRoleUser;
'test-vona:test': ModelTest;
'test-vona:testDynamicTable': ModelTestDynamicTable;
'test-vona:user': ModelUser;
  }
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.testCtx.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-test-vona' {
  
        export interface BeanTestCtx {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanTestCtx } from '../bean/bean.testCtx.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'testCtx': BeanTestCtx;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/aopMethod.ts';
export * from '../service/caching.ts';
export * from '../service/test.ts';
export * from '../service/testApp.ts';
export * from '../service/testClass.ts';
export * from '../service/testData.ts';
export * from '../service/transaction.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'test-vona:aopMethod': never;
'test-vona:caching': never;
'test-vona:test': never;
'test-vona:testApp': never;
'test-vona:testClass': never;
'test-vona:testData': never;
'test-vona:transaction': never;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface ServiceAopMethod {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ServiceAopMethod {
            get $beanFullName(): 'test-vona.service.aopMethod';
            get $onionName(): 'test-vona:aopMethod';
          }

        export interface ServiceCaching {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ServiceCaching {
            get $beanFullName(): 'test-vona.service.caching';
            get $onionName(): 'test-vona:caching';
          }

        export interface ServiceTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ServiceTest {
            get $beanFullName(): 'test-vona.service.test';
            get $onionName(): 'test-vona:test';
          }

        export interface ServiceTestApp {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ServiceTestApp {
            get $beanFullName(): 'test-vona.service.testApp';
            get $onionName(): 'test-vona:testApp';
          }

        export interface ServiceTestClass {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ServiceTestClass {
            get $beanFullName(): 'test-vona.service.testClass';
            get $onionName(): 'test-vona:testClass';
          }

        export interface ServiceTestData {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ServiceTestData {
            get $beanFullName(): 'test-vona.service.testData';
            get $onionName(): 'test-vona:testData';
          }

        export interface ServiceTransaction {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ServiceTransaction {
            get $beanFullName(): 'test-vona.service.transaction';
            get $onionName(): 'test-vona:transaction';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceAopMethod } from '../service/aopMethod.ts';
import type { ServiceCaching } from '../service/caching.ts';
import type { ServiceTest } from '../service/test.ts';
import type { ServiceTestApp } from '../service/testApp.ts';
import type { ServiceTestClass } from '../service/testClass.ts';
import type { ServiceTestData } from '../service/testData.ts';
import type { ServiceTransaction } from '../service/transaction.ts';
export interface IModuleService {
  'aopMethod': ServiceAopMethod;
'caching': ServiceCaching;
'test': ServiceTest;
'testApp': ServiceTestApp;
'testClass': ServiceTestClass;
'testData': ServiceTestData;
'transaction': ServiceTransaction;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'test-vona.service.aopMethod': ServiceAopMethod;
'test-vona.service.caching': ServiceCaching;
'test-vona.service.test': ServiceTest;
'test-vona.service.testApp': ServiceTestApp;
'test-vona.service.testClass': ServiceTestClass;
'test-vona.service.testData': ServiceTestData;
'test-vona.service.transaction': ServiceTransaction;
  }
}
/** service: end */
/** broadcast: begin */
export * from '../bean/broadcast.test.ts';

import { type IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  
    export interface IBroadcastRecord {
      'test-vona:test': IDecoratorBroadcastOptions;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface BroadcastTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface BroadcastTest {
            get $beanFullName(): 'test-vona.broadcast.test';
            get $onionName(): 'test-vona:test';
          } 
}
/** broadcast: end */
/** broadcast: begin */
import type { BroadcastTest } from '../bean/broadcast.test.ts';
export interface IModuleBroadcast {
  'test': BroadcastTest;
}
/** broadcast: end */
/** cacheMem: begin */
export * from '../bean/cacheMem.test.ts';

import { type IDecoratorCacheMemOptions } from 'vona-module-a-cache';
declare module 'vona-module-a-cache' {
  
    export interface ICacheMemRecord {
      'test-vona:test': IDecoratorCacheMemOptions;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface CacheMemTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface CacheMemTest {
            get $beanFullName(): 'test-vona.cacheMem.test';
            get $onionName(): 'test-vona:test';
          } 
}
/** cacheMem: end */
/** cacheMem: begin */
import type { CacheMemTest } from '../bean/cacheMem.test.ts';
export interface IModuleCacheMem {
  'test': CacheMemTest;
}
/** cacheMem: end */
/** cacheRedis: begin */
export * from '../bean/cacheRedis.test.ts';

import { type IDecoratorCacheRedisOptions } from 'vona-module-a-cache';
declare module 'vona-module-a-cache' {
  
    export interface ICacheRedisRecord {
      'test-vona:test': IDecoratorCacheRedisOptions;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface CacheRedisTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface CacheRedisTest {
            get $beanFullName(): 'test-vona.cacheRedis.test';
            get $onionName(): 'test-vona:test';
          } 
}
/** cacheRedis: end */
/** cacheRedis: begin */
import type { CacheRedisTest } from '../bean/cacheRedis.test.ts';
export interface IModuleCacheRedis {
  'test': CacheRedisTest;
}
/** cacheRedis: end */
/** event: begin */
export * from '../bean/event.helloEcho.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-test-vona' {
  
        export interface EventHelloEcho {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface EventHelloEcho {
            get $beanFullName(): 'test-vona.event.helloEcho';
            get $onionName(): 'test-vona:helloEcho';
          } 
}
/** event: end */
/** event: begin */
import type { EventHelloEcho } from '../bean/event.helloEcho.ts';
export interface IModuleEvent {
  'helloEcho': EventHelloEcho;
}
/** event: end */
/** event: begin */
import type { TypeEventHelloEchoData, TypeEventHelloEchoResult } from '../bean/event.helloEcho.ts';
import type { EventOn } from 'vona-module-a-event'; 
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'test-vona:helloEcho': EventOn<TypeEventHelloEchoData, TypeEventHelloEchoResult>;
  }
}
/** event: end */
/** eventListener: begin */
export * from '../bean/eventListener.helloEcho.ts';

import { type IDecoratorEventListenerOptions } from 'vona-module-a-event';
declare module 'vona-module-a-event' {
  
    export interface IEventListenerRecord {
      'test-vona:helloEcho': IDecoratorEventListenerOptions;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface EventListenerHelloEcho {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface EventListenerHelloEcho {
            get $beanFullName(): 'test-vona.eventListener.helloEcho';
            get $onionName(): 'test-vona:helloEcho';
          } 
}
/** eventListener: end */
/** meta: begin */
export * from '../bean/meta.version.ts';

import 'vona';
declare module 'vona' {
  
    export interface IMetaRecord {
      'test-vona:version': never;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface MetaVersion {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface MetaVersion {
            get $beanFullName(): 'test-vona.meta.version';
            get $onionName(): 'test-vona:version';
          } 
}
/** meta: end */
/** queue: begin */
export * from '../bean/queue.test.ts';

import { type IDecoratorQueueOptions } from 'vona-module-a-queue';
declare module 'vona-module-a-queue' {
  
    export interface IQueueRecord {
      'test-vona:test': IDecoratorQueueOptions;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface QueueTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface QueueTest {
            get $beanFullName(): 'test-vona.queue.test';
            get $onionName(): 'test-vona:test';
          } 
}
/** queue: end */
/** queue: begin */
import type { QueueTest } from '../bean/queue.test.ts';
export interface IModuleQueue {
  'test': QueueTest;
}
/** queue: end */
/** schedule: begin */
export * from '../bean/schedule.test.ts';
export * from '../bean/schedule.test3.ts';

import { type IDecoratorScheduleOptions } from 'vona-module-a-schedule';
declare module 'vona-module-a-schedule' {
  
    export interface IScheduleRecord {
      'test-vona:test': IDecoratorScheduleOptions;
'test-vona:test3': IDecoratorScheduleOptions;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface ScheduleTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ScheduleTest {
            get $beanFullName(): 'test-vona.schedule.test';
            get $onionName(): 'test-vona:test';
          }

        export interface ScheduleTest3 {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ScheduleTest3 {
            get $beanFullName(): 'test-vona.schedule.test3';
            get $onionName(): 'test-vona:test3';
          } 
}
/** schedule: end */
/** summerCache: begin */
export * from '../bean/summerCache.test.ts';

import { type IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
declare module 'vona-module-a-summer' {
  
    export interface ISummerCacheRecord {
      'test-vona:test': IDecoratorSummerCacheOptions;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface SummerCacheTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface SummerCacheTest {
            get $beanFullName(): 'test-vona.summerCache.test';
            get $onionName(): 'test-vona:test';
          } 
}
/** summerCache: end */
/** summerCache: begin */
import type { SummerCacheTest } from '../bean/summerCache.test.ts';
export interface IModuleSummerCache {
  'test': SummerCacheTest;
}
/** summerCache: end */
/** dto: begin */
export * from '../dto/profile.ts';
export * from '../dto/roleLazy.ts';
export * from '../dto/user.ts';
export * from '../dto/userLazy.ts';
import type { IDtoOptionsProfile } from '../dto/profile.ts';
import type { IDtoOptionsRoleLazy } from '../dto/roleLazy.ts';
import type { IDtoOptionsUser } from '../dto/user.ts';
import type { IDtoOptionsUserLazy } from '../dto/userLazy.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IDtoRecord {
      'test-vona:profile': IDtoOptionsProfile;
'test-vona:roleLazy': IDtoOptionsRoleLazy;
'test-vona:user': IDtoOptionsUser;
'test-vona:userLazy': IDtoOptionsUserLazy;
    }

  
}
declare module 'vona-module-test-vona' {
   
}
/** dto: end */
/** dto: begin */
import type { DtoProfile } from '../dto/profile.ts';
import type { DtoRoleLazy } from '../dto/roleLazy.ts';
import type { DtoUser } from '../dto/user.ts';
import type { DtoUserLazy } from '../dto/userLazy.ts'; 
declare module 'vona-module-test-vona' {
  
    export interface IDtoOptionsProfile {
      fields?: TypeEntityOptionsFields<DtoProfile, IDtoOptionsProfile[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsRoleLazy {
      fields?: TypeEntityOptionsFields<DtoRoleLazy, IDtoOptionsRoleLazy[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsUser {
      fields?: TypeEntityOptionsFields<DtoUser, IDtoOptionsUser[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsUserLazy {
      fields?: TypeEntityOptionsFields<DtoUserLazy, IDtoOptionsUserLazy[TypeSymbolKeyFieldsMore]>;
    }
}
/** dto: end */
/** controller: begin */
export * from '../controller/bean.ts';
export * from '../controller/cacheMem.ts';
export * from '../controller/cacheRedis.ts';
export * from '../controller/dtoTest.ts';
export * from '../controller/guardPassport.ts';
export * from '../controller/onion.ts';
export * from '../controller/passport.ts';
export * from '../controller/performAction.ts';
export * from '../controller/queue.ts';
export * from '../controller/summer.ts';
export * from '../controller/tail.ts';
export * from '../controller/transaction.ts';
export * from '../controller/upload.ts';
import type { IControllerOptionsBean } from '../controller/bean.ts';
import type { IControllerOptionsCacheMem } from '../controller/cacheMem.ts';
import type { IControllerOptionsCacheRedis } from '../controller/cacheRedis.ts';
import type { IControllerOptionsDtoTest } from '../controller/dtoTest.ts';
import type { IControllerOptionsGuardPassport } from '../controller/guardPassport.ts';
import type { IControllerOptionsOnion } from '../controller/onion.ts';
import type { IControllerOptionsPassport } from '../controller/passport.ts';
import type { IControllerOptionsPerformAction } from '../controller/performAction.ts';
import type { IControllerOptionsQueue } from '../controller/queue.ts';
import type { IControllerOptionsSummer } from '../controller/summer.ts';
import type { IControllerOptionsTail } from '../controller/tail.ts';
import type { IControllerOptionsTransaction } from '../controller/transaction.ts';
import type { IControllerOptionsUpload } from '../controller/upload.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'test-vona:bean': IControllerOptionsBean;
'test-vona:cacheMem': IControllerOptionsCacheMem;
'test-vona:cacheRedis': IControllerOptionsCacheRedis;
'test-vona:dtoTest': IControllerOptionsDtoTest;
'test-vona:guardPassport': IControllerOptionsGuardPassport;
'test-vona:onion': IControllerOptionsOnion;
'test-vona:passport': IControllerOptionsPassport;
'test-vona:performAction': IControllerOptionsPerformAction;
'test-vona:queue': IControllerOptionsQueue;
'test-vona:summer': IControllerOptionsSummer;
'test-vona:tail': IControllerOptionsTail;
'test-vona:transaction': IControllerOptionsTransaction;
'test-vona:upload': IControllerOptionsUpload;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface ControllerBean {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerBean {
            get $beanFullName(): 'test-vona.controller.bean';
            get $onionName(): 'test-vona:bean';
          }

        export interface ControllerCacheMem {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerCacheMem {
            get $beanFullName(): 'test-vona.controller.cacheMem';
            get $onionName(): 'test-vona:cacheMem';
          }

        export interface ControllerCacheRedis {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerCacheRedis {
            get $beanFullName(): 'test-vona.controller.cacheRedis';
            get $onionName(): 'test-vona:cacheRedis';
          }

        export interface ControllerDtoTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerDtoTest {
            get $beanFullName(): 'test-vona.controller.dtoTest';
            get $onionName(): 'test-vona:dtoTest';
          }

        export interface ControllerGuardPassport {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerGuardPassport {
            get $beanFullName(): 'test-vona.controller.guardPassport';
            get $onionName(): 'test-vona:guardPassport';
          }

        export interface ControllerOnion {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerOnion {
            get $beanFullName(): 'test-vona.controller.onion';
            get $onionName(): 'test-vona:onion';
          }

        export interface ControllerPassport {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerPassport {
            get $beanFullName(): 'test-vona.controller.passport';
            get $onionName(): 'test-vona:passport';
          }

        export interface ControllerPerformAction {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerPerformAction {
            get $beanFullName(): 'test-vona.controller.performAction';
            get $onionName(): 'test-vona:performAction';
          }

        export interface ControllerQueue {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerQueue {
            get $beanFullName(): 'test-vona.controller.queue';
            get $onionName(): 'test-vona:queue';
          }

        export interface ControllerSummer {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerSummer {
            get $beanFullName(): 'test-vona.controller.summer';
            get $onionName(): 'test-vona:summer';
          }

        export interface ControllerTail {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerTail {
            get $beanFullName(): 'test-vona.controller.tail';
            get $onionName(): 'test-vona:tail';
          }

        export interface ControllerTransaction {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerTransaction {
            get $beanFullName(): 'test-vona.controller.transaction';
            get $onionName(): 'test-vona:transaction';
          }

        export interface ControllerUpload {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

          export interface ControllerUpload {
            get $beanFullName(): 'test-vona.controller.upload';
            get $onionName(): 'test-vona:upload';
          } 
}
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerBean } from '../controller/bean.ts';
// @ts-ignore ignore
import type { ControllerCacheMem } from '../controller/cacheMem.ts';
// @ts-ignore ignore
import type { ControllerCacheRedis } from '../controller/cacheRedis.ts';
// @ts-ignore ignore
import type { ControllerDtoTest } from '../controller/dtoTest.ts';
// @ts-ignore ignore
import type { ControllerGuardPassport } from '../controller/guardPassport.ts';
// @ts-ignore ignore
import type { ControllerOnion } from '../controller/onion.ts';
// @ts-ignore ignore
import type { ControllerPassport } from '../controller/passport.ts';
// @ts-ignore ignore
import type { ControllerPerformAction } from '../controller/performAction.ts';
// @ts-ignore ignore
import type { ControllerQueue } from '../controller/queue.ts';
// @ts-ignore ignore
import type { ControllerSummer } from '../controller/summer.ts';
// @ts-ignore ignore
import type { ControllerTail } from '../controller/tail.ts';
// @ts-ignore ignore
import type { ControllerTransaction } from '../controller/transaction.ts';
// @ts-ignore ignore
import type { ControllerUpload } from '../controller/upload.ts';
declare module 'vona-module-test-vona' {
  
    export interface IControllerOptionsBean {
      actions?: TypeControllerOptionsActions<ControllerBean>;
    }

    export interface IControllerOptionsCacheMem {
      actions?: TypeControllerOptionsActions<ControllerCacheMem>;
    }

    export interface IControllerOptionsCacheRedis {
      actions?: TypeControllerOptionsActions<ControllerCacheRedis>;
    }

    export interface IControllerOptionsDtoTest {
      actions?: TypeControllerOptionsActions<ControllerDtoTest>;
    }

    export interface IControllerOptionsGuardPassport {
      actions?: TypeControllerOptionsActions<ControllerGuardPassport>;
    }

    export interface IControllerOptionsOnion {
      actions?: TypeControllerOptionsActions<ControllerOnion>;
    }

    export interface IControllerOptionsPassport {
      actions?: TypeControllerOptionsActions<ControllerPassport>;
    }

    export interface IControllerOptionsPerformAction {
      actions?: TypeControllerOptionsActions<ControllerPerformAction>;
    }

    export interface IControllerOptionsQueue {
      actions?: TypeControllerOptionsActions<ControllerQueue>;
    }

    export interface IControllerOptionsSummer {
      actions?: TypeControllerOptionsActions<ControllerSummer>;
    }

    export interface IControllerOptionsTail {
      actions?: TypeControllerOptionsActions<ControllerTail>;
    }

    export interface IControllerOptionsTransaction {
      actions?: TypeControllerOptionsActions<ControllerTransaction>;
    }

    export interface IControllerOptionsUpload {
      actions?: TypeControllerOptionsActions<ControllerUpload>;
    }
}
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord{
        '/test/vona/bean/test': undefined;
'/test/vona/bean/service': undefined;
'/test/vona/dtoTest': undefined;
'/test/vona/guardPassport/testUserName': undefined;
'/test/vona/guardPassport/testUserNameFail': undefined;
'/test/vona/guardPassport/testRoleName': undefined;
'/test/vona/guardPassport/testRoleNameFail': undefined;
'/': undefined;
'/test/vona/onion/echo3/:userId': undefined;
'/test/vona/onion/echo5': undefined;
'/test/vona/onion/echo6': undefined;
'/test/vona/passport/echo/:name': undefined;
'/test/vona/passport/isAuthenticated': undefined;
    }
export interface IApiPathPostRecord{
        '/test/vona/cacheMem': undefined;
'/test/vona/cacheRedis': undefined;
'//echo': undefined;
'/test/vona/onion/echo2/:userId/:userName': undefined;
'/test/vona/onion/echo4': undefined;
'/test/vona/passport/login': undefined;
'/test/vona/passport/refresh': undefined;
'/test/vona/passport/logout': undefined;
'/test/vona/performAction/echo': undefined;
'/test/vona/queue/pushAsync': undefined;
'/test/vona/queue/push': undefined;
'/test/vona/summer': undefined;
'/test/vona/tail': undefined;
'/test/vona/transaction/fail': undefined;
'/test/vona/transaction/success': undefined;
'/test/vona/upload/fields': undefined;
'/test/vona/upload/file': undefined;
'/test/vona/upload/files': undefined;
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
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleTestVona extends BeanScopeBase {}

export interface ScopeModuleTestVona {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
entity: IModuleEntity;
model: IModuleModel;
service: IModuleService;
broadcast: IModuleBroadcast;
cacheMem: IModuleCacheMem;
cacheRedis: IModuleCacheRedis;
event: IModuleEvent;
queue: IModuleQueue;
summerCache: IModuleSummerCache;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'test-vona': ScopeModuleTestVona;
  }

  export interface IBeanScopeContainer {
    testVona: ScopeModuleTestVona;
  }
  
  export interface IBeanScopeConfig {
    'test-vona': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'test-vona': (typeof locales)[TypeLocaleBase];
  }
}

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `test-vona::${K}` {
  return `test-vona::${key}`;
}
/** scope: end */
