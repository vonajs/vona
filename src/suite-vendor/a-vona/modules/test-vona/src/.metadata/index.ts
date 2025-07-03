/* eslint-disable */
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

        export interface AopSimple {
          /** @internal */
          get scope(): ScopeModuleTestVona;
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
}
/** aopMethod: end */
/** entity: begin */
export * from '../entity/post.ts';
export * from '../entity/postContent.ts';
export * from '../entity/role.ts';
export * from '../entity/test.ts';
export * from '../entity/user.ts';
import type { IEntityOptionsPost } from '../entity/post.ts';
import type { IEntityOptionsPostContent } from '../entity/postContent.ts';
import type { IEntityOptionsRole } from '../entity/role.ts';
import type { IEntityOptionsTest } from '../entity/test.ts';
import type { IEntityOptionsUser } from '../entity/user.ts';
import 'vona';
declare module 'vona-module-a-database' {
  
    export interface IEntityRecord {
      'test-vona:post': Omit<IEntityOptionsPost, '_fieldsMore_'>;
'test-vona:postContent': Omit<IEntityOptionsPostContent, '_fieldsMore_'>;
'test-vona:role': Omit<IEntityOptionsRole, '_fieldsMore_'>;
'test-vona:test': Omit<IEntityOptionsTest, '_fieldsMore_'>;
'test-vona:user': Omit<IEntityOptionsUser, '_fieldsMore_'>;
    }

  
}
declare module 'vona-module-test-vona' {
   
}
/** entity: end */
/** entity: begin */
import type { EntityPost } from '../entity/post.ts';
import type { EntityPostContent } from '../entity/postContent.ts';
import type { EntityRole } from '../entity/role.ts';
import type { EntityTest } from '../entity/test.ts';
import type { EntityUser } from '../entity/user.ts';
export interface IModuleEntity {
  'post': TypeEntityMeta<EntityPost,EntityPostTableName>;
'postContent': TypeEntityMeta<EntityPostContent,EntityPostContentTableName>;
'role': TypeEntityMeta<EntityRole,EntityRoleTableName>;
'test': TypeEntityMeta<EntityTest,EntityTestTableName>;
'user': TypeEntityMeta<EntityUser,EntityUserTableName>;
}
/** entity: end */
/** entity: begin */
export type EntityPostTableName = 'testVonaPost';
export type EntityPostContentTableName = 'testVonaPostContent';
export type EntityRoleTableName = 'testVonaRole';
export type EntityTestTableName = 'testVonaTest';
export type EntityUserTableName = 'testVonaUser';
declare module 'vona-module-a-database' {
  export interface ITableRecord {
    'testVonaPost': never;
'testVonaPostContent': never;
'testVonaRole': never;
'testVonaTest': never;
'testVonaUser': never;
  }
}
declare module 'vona-module-test-vona' {
  
    export interface IEntityOptionsPost {
      fields?: TypeEntityOptionsFields<EntityPost, IEntityOptionsPost['_fieldsMore_']>;
    }

    export interface IEntityOptionsPostContent {
      fields?: TypeEntityOptionsFields<EntityPostContent, IEntityOptionsPostContent['_fieldsMore_']>;
    }

    export interface IEntityOptionsRole {
      fields?: TypeEntityOptionsFields<EntityRole, IEntityOptionsRole['_fieldsMore_']>;
    }

    export interface IEntityOptionsTest {
      fields?: TypeEntityOptionsFields<EntityTest, IEntityOptionsTest['_fieldsMore_']>;
    }

    export interface IEntityOptionsUser {
      fields?: TypeEntityOptionsFields<EntityUser, IEntityOptionsUser['_fieldsMore_']>;
    }
}
/** entity: end */
/** model: begin */
export * from '../model/test.ts';
export * from '../model/testDynamicTable.ts';

import { type IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  
    export interface IModelRecord {
      'test-vona:test': IDecoratorModelOptions;
'test-vona:testDynamicTable': IDecoratorModelOptions;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface ModelTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ModelTestDynamicTable {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        } 
}
/** model: end */
/** model: begin */
import type { ModelTest } from '../model/test.ts';
import type { ModelTestDynamicTable } from '../model/testDynamicTable.ts';
export interface IModuleModel {
  'test': ModelTest;
'testDynamicTable': ModelTestDynamicTable;
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
export * from '../service/transaction.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'test-vona:aopMethod': never;
'test-vona:caching': never;
'test-vona:test': never;
'test-vona:testApp': never;
'test-vona:testClass': never;
'test-vona:transaction': never;
    }

  
}
declare module 'vona-module-test-vona' {
  
        export interface ServiceAopMethod {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ServiceCaching {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ServiceTest {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ServiceTestApp {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ServiceTestClass {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ServiceTransaction {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        } 
}
/** service: end */
/** service: begin */
import type { ServiceAopMethod } from '../service/aopMethod.ts';
import type { ServiceCaching } from '../service/caching.ts';
import type { ServiceTest } from '../service/test.ts';
import type { ServiceTestApp } from '../service/testApp.ts';
import type { ServiceTestClass } from '../service/testClass.ts';
import type { ServiceTransaction } from '../service/transaction.ts';
export interface IModuleService {
  'aopMethod': ServiceAopMethod;
'caching': ServiceCaching;
'test': ServiceTest;
'testApp': ServiceTestApp;
'testClass': ServiceTestClass;
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

        export interface ScheduleTest3 {
          /** @internal */
          get scope(): ScopeModuleTestVona;
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
export * from '../dto/user.ts';
import type { IDtoOptionsProfile } from '../dto/profile.ts';
import type { IDtoOptionsUser } from '../dto/user.ts';
import 'vona';
declare module 'vona-module-a-web' {
  
    export interface IDtoRecord {
      'test-vona:profile': Omit<IDtoOptionsProfile, '_fieldsMore_'>;
'test-vona:user': Omit<IDtoOptionsUser, '_fieldsMore_'>;
    }

  
}
declare module 'vona-module-test-vona' {
   
}
/** dto: end */
/** dto: begin */
import type { DtoProfile } from '../dto/profile.ts';
import type { DtoUser } from '../dto/user.ts'; 
declare module 'vona-module-test-vona' {
  
    export interface IDtoOptionsProfile {
      fields?: TypeEntityOptionsFields<DtoProfile, IDtoOptionsProfile['_fieldsMore_']>;
    }

    export interface IDtoOptionsUser {
      fields?: TypeEntityOptionsFields<DtoUser, IDtoOptionsUser['_fieldsMore_']>;
    }
}
/** dto: end */
/** controller: begin */
export * from '../controller/bean.ts';
export * from '../controller/cacheMem.ts';
export * from '../controller/cacheRedis.ts';
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

        export interface ControllerCacheMem {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ControllerCacheRedis {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ControllerGuardPassport {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ControllerOnion {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ControllerPassport {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ControllerPerformAction {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ControllerQueue {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ControllerSummer {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ControllerTail {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ControllerTransaction {
          /** @internal */
          get scope(): ScopeModuleTestVona;
        }

        export interface ControllerUpload {
          /** @internal */
          get scope(): ScopeModuleTestVona;
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
