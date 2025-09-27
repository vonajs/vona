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
export * from '../bean/broadcast.disposeInstances.ts';
export * from '../bean/broadcast.reloadInstances.ts';

import { type IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  
    export interface IBroadcastRecord {
      'a-beanmutate:disposeInstances': IDecoratorBroadcastOptions;
'a-beanmutate:reloadInstances': IDecoratorBroadcastOptions;
    }

  
}
declare module 'vona-module-a-beanmutate' {
  
        export interface BroadcastDisposeInstances {
          /** @internal */
          get scope(): ScopeModuleABeanmutate;
        }

          export interface BroadcastDisposeInstances {
            get $beanFullName(): 'a-beanmutate.broadcast.disposeInstances';
            get $onionName(): 'a-beanmutate:disposeInstances';
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
import type { BroadcastDisposeInstances } from '../bean/broadcast.disposeInstances.ts';
import type { BroadcastReloadInstances } from '../bean/broadcast.reloadInstances.ts';
export interface IModuleBroadcast {
  'disposeInstances': BroadcastDisposeInstances;
'reloadInstances': BroadcastReloadInstances;
}
/** broadcast: end */
/** event: begin */
export * from '../bean/event.disposeInstances.ts';
export * from '../bean/event.reloadInstances.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-beanmutate' {
  
        export interface EventDisposeInstances {
          /** @internal */
          get scope(): ScopeModuleABeanmutate;
        }

          export interface EventDisposeInstances {
            get $beanFullName(): 'a-beanmutate.event.disposeInstances';
            get $onionName(): 'a-beanmutate:disposeInstances';
          }

        export interface EventReloadInstances {
          /** @internal */
          get scope(): ScopeModuleABeanmutate;
        }

          export interface EventReloadInstances {
            get $beanFullName(): 'a-beanmutate.event.reloadInstances';
            get $onionName(): 'a-beanmutate:reloadInstances';
          } 
}
/** event: end */
/** event: begin */
import type { EventDisposeInstances } from '../bean/event.disposeInstances.ts';
import type { EventReloadInstances } from '../bean/event.reloadInstances.ts';
export interface IModuleEvent {
  'disposeInstances': EventDisposeInstances;
'reloadInstances': EventReloadInstances;
}
/** event: end */
/** event: begin */
import type { TypeEventDisposeInstancesData, TypeEventDisposeInstancesResult } from '../bean/event.disposeInstances.ts';
import type { TypeEventReloadInstancesData, TypeEventReloadInstancesResult } from '../bean/event.reloadInstances.ts';
import type { EventOn } from 'vona-module-a-event'; 
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-beanmutate:disposeInstances': EventOn<TypeEventDisposeInstancesData, TypeEventDisposeInstancesResult>;
'a-beanmutate:reloadInstances': EventOn<TypeEventReloadInstancesData, TypeEventReloadInstancesResult>;
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
