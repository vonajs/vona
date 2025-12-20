/* eslint-disable */
import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';
/** interceptor: begin */
export * from '../bean/interceptor.openapiSchema.ts';
import type { IInterceptorOptionsOpenapiSchema } from '../bean/interceptor.openapiSchema.ts';
import 'vona-module-a-aspect';
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

          export interface InterceptorOpenapiSchema {
            get $beanFullName(): 'a-openapischema.interceptor.openapiSchema';
            get $onionName(): 'a-openapischema:openapiSchema';
            get $onionOptions(): IInterceptorOptionsOpenapiSchema;
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

          export interface EventRetrieveOpenapiSchema {
            get $beanFullName(): 'a-openapischema.event.retrieveOpenapiSchema';
            get $onionName(): 'a-openapischema:retrieveOpenapiSchema';
            
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
/** controller: begin */
export * from '../controller/resource.ts';
import type { IControllerOptionsResource } from '../controller/resource.ts';
import 'vona-module-a-web';
declare module 'vona-module-a-web' {
  
    export interface IControllerRecord {
      'a-openapischema:resource': IControllerOptionsResource;
    }

  
}
declare module 'vona-module-a-openapischema' {
  
        export interface ControllerResource {
          /** @internal */
          get scope(): ScopeModuleAOpenapischema;
        }

          export interface ControllerResource {
            get $beanFullName(): 'a-openapischema.controller.resource';
            get $onionName(): 'a-openapischema:resource';
            get $onionOptions(): IControllerOptionsResource;
          } 
}
/** controller: end */
/** controller: begin */
// @ts-ignore ignore
import type { ControllerResource } from '../controller/resource.ts';
declare module 'vona-module-a-openapischema' {
  
    export interface IControllerOptionsResource {
      actions?: TypeControllerOptionsActions<ControllerResource>;
    }
}

/** controller: end */
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
