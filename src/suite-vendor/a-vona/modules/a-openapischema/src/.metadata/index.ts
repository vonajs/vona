import type { BeanScopeUtil } from 'vona';
import type { EventOn } from 'vona-module-a-event';

/** event: end */
/** event: begin */
import type { EventRetrieveOpenapiSchema } from '../bean/event.retrieveOpenapiSchema.ts';
/** event: end */
/** event: begin */
import type { TypeEventRetrieveOpenapiSchemaData, TypeEventRetrieveOpenapiSchemaResult } from '../bean/event.retrieveOpenapiSchema.ts';
/** interceptor: end */
/** event: begin */
import type { IInterceptorOptionsOpenapiSchema } from '../bean/interceptor.openapiSchema.ts';
/** event: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/event.retrieveOpenapiSchema.ts';
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
/** interceptor: begin */
export * from '../bean/interceptor.openapiSchema.ts';
declare module 'vona' {

}
declare module 'vona-module-a-openapischema' {

  export interface EventRetrieveOpenapiSchema {
    /** @internal */
    get scope(): ScopeModuleAOpenapischema;
  }
}
export interface IModuleEvent {
  retrieveOpenapiSchema: EventRetrieveOpenapiSchema;
}
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-openapischema:retrieveOpenapiSchema': EventOn<TypeEventRetrieveOpenapiSchemaData, TypeEventRetrieveOpenapiSchemaResult>;
  }
}

@Scope()
export class ScopeModuleAOpenapischema extends BeanScopeBase {}

export interface ScopeModuleAOpenapischema {
  util: BeanScopeUtil;
  event: IModuleEvent;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-openapischema': ScopeModuleAOpenapischema;
  }

  export interface IBeanScopeContainer {
    openapischema: ScopeModuleAOpenapischema;
  }

}

/** scope: end */
