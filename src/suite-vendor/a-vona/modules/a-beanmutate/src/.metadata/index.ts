/* eslint-disable */
/** bean: begin */
export * from '../bean/bean.mutate.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-beanmutate' {
  
        export interface BeanMutate {
          /** @internal */
          get scope(): ScopeModuleABeanmutate;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanMutate } from '../bean/bean.mutate.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'mutate': BeanMutate;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.databaseClientDispose.ts';
export * from '../bean/broadcast.reloadInstances.ts';

import { type IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  
    export interface IBroadcastRecord {
      'a-beanmutate:databaseClientDispose': IDecoratorBroadcastOptions;
'a-beanmutate:reloadInstances': IDecoratorBroadcastOptions;
    }

  
}
declare module 'vona-module-a-beanmutate' {
  
        export interface BroadcastDatabaseClientDispose {
          /** @internal */
          get scope(): ScopeModuleABeanmutate;
        }

          export interface BroadcastDatabaseClientDispose {
            get $beanFullName(): 'a-beanmutate.broadcast.databaseClientDispose';
            get $onionName(): 'a-beanmutate:databaseClientDispose';
          }

        export interface BroadcastReloadInstances {
          /** @internal */
          get scope(): ScopeModuleABeanmutate;
        }

          export interface BroadcastReloadInstances {
            get $beanFullName(): 'a-beanmutate.broadcast.reloadInstances';
            get $onionName(): 'a-beanmutate:reloadInstances';
          } 
}
/** broadcast: end */
/** broadcast: begin */
import type { BroadcastDatabaseClientDispose } from '../bean/broadcast.databaseClientDispose.ts';
import type { BroadcastReloadInstances } from '../bean/broadcast.reloadInstances.ts';
export interface IModuleBroadcast {
  'databaseClientDispose': BroadcastDatabaseClientDispose;
'reloadInstances': BroadcastReloadInstances;
}
/** broadcast: end */
/** event: begin */
export * from '../bean/event.databaseClientDispose.ts';
export * from '../bean/event.databaseClientReload.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-beanmutate' {
  
        export interface EventDatabaseClientDispose {
          /** @internal */
          get scope(): ScopeModuleABeanmutate;
        }

          export interface EventDatabaseClientDispose {
            get $beanFullName(): 'a-beanmutate.event.databaseClientDispose';
            get $onionName(): 'a-beanmutate:databaseClientDispose';
          }

        export interface EventDatabaseClientReload {
          /** @internal */
          get scope(): ScopeModuleABeanmutate;
        }

          export interface EventDatabaseClientReload {
            get $beanFullName(): 'a-beanmutate.event.databaseClientReload';
            get $onionName(): 'a-beanmutate:databaseClientReload';
          } 
}
/** event: end */
/** event: begin */
import type { EventDatabaseClientDispose } from '../bean/event.databaseClientDispose.ts';
import type { EventDatabaseClientReload } from '../bean/event.databaseClientReload.ts';
export interface IModuleEvent {
  'databaseClientDispose': EventDatabaseClientDispose;
'databaseClientReload': EventDatabaseClientReload;
}
/** event: end */
/** event: begin */
import type { TypeEventDatabaseClientDisposeData, TypeEventDatabaseClientDisposeResult } from '../bean/event.databaseClientDispose.ts';
import type { TypeEventDatabaseClientReloadData, TypeEventDatabaseClientReloadResult } from '../bean/event.databaseClientReload.ts';
import type { EventOn } from 'vona-module-a-event'; 
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-beanmutate:databaseClientDispose': EventOn<TypeEventDatabaseClientDisposeData, TypeEventDatabaseClientDisposeResult>;
'a-beanmutate:databaseClientReload': EventOn<TypeEventDatabaseClientReloadData, TypeEventDatabaseClientReloadResult>;
  }
}
/** event: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleABeanmutate extends BeanScopeBase {}

export interface ScopeModuleABeanmutate {
  util: BeanScopeUtil;
broadcast: IModuleBroadcast;
event: IModuleEvent;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-beanmutate': ScopeModuleABeanmutate;
  }

  export interface IBeanScopeContainer {
    beanmutate: ScopeModuleABeanmutate;
  }
  
  

  
}

/** scope: end */
