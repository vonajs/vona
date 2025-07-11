/* eslint-disable */
/** interceptor: begin */
export * from '../bean/interceptor.openapiSchema.ts';
import type { IInterceptorOptionsOpenapiSchema } from '../bean/interceptor.openapiSchema.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IInterceptorRecordGlobal {
      'a-openapischema:openapiSchema': IInterceptorOptionsOpenapiSchema;
    }

  
}
declare module 'vona-module-a-openapischema' {
  
        export interface InterceptorOpenapiSchema {
          /** @internal */
          get scope(): ScopeModuleAOpenapischema;
        } 
}
/** interceptor: end */
/** event: begin */
export * from '../bean/event.retrieveOpenapiSchema.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-openapischema' {
  
        export interface EventRetrieveOpenapiSchema {
          /** @internal */
          get scope(): ScopeModuleAOpenapischema;
        } 
}
/** event: end */
/** event: begin */
import type { EventRetrieveOpenapiSchema } from '../bean/event.retrieveOpenapiSchema.ts';
export interface IModuleEvent {
  'retrieveOpenapiSchema': EventRetrieveOpenapiSchema;
}
/** event: end */
/** event: begin */
import type { TypeEventRetrieveOpenapiSchemaData, TypeEventRetrieveOpenapiSchemaResult } from '../bean/event.retrieveOpenapiSchema.ts';
import type { EventOn } from 'vona-module-a-event'; 
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-openapischema:retrieveOpenapiSchema': EventOn<TypeEventRetrieveOpenapiSchemaData, TypeEventRetrieveOpenapiSchemaResult>;
  }
}
/** event: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAOpenapischema extends BeanScopeBase {}

export interface ScopeModuleAOpenapischema {
  util: BeanScopeUtil;
event: IModuleEvent;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-openapischema': ScopeModuleAOpenapischema;
  }

  export interface IBeanScopeContainer {
    openapischema: ScopeModuleAOpenapischema;
  }
  
  

  
}

/** scope: end */
