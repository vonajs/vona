/* eslint-disable */
import type { TypeSymbolKeyFieldsMore } from 'vona-module-a-orm';
import type { TypeEntityOptionsFields,TypeControllerOptionsActions } from 'vona-module-a-openapi';
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
/** bean: begin */
export * from '../bean/bean.permission.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-openapischema' {
  
        export interface BeanPermission {
          /** @internal */
          get scope(): ScopeModuleAOpenapischema;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanPermission } from '../bean/bean.permission.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'permission': BeanPermission;
  }
}
/** bean: end */
/** event: begin */
export * from '../bean/event.retrievePermissions.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-openapischema' {
  
        export interface EventRetrievePermissions {
          /** @internal */
          get scope(): ScopeModuleAOpenapischema;
        }

          export interface EventRetrievePermissions {
            get $beanFullName(): 'a-openapischema.event.retrievePermissions';
            get $onionName(): 'a-openapischema:retrievePermissions';
            
          } 
}
/** event: end */
/** event: begin */
import type { EventRetrievePermissions } from '../bean/event.retrievePermissions.ts';
export interface IModuleEvent {
  'retrievePermissions': EventRetrievePermissions;
}
/** event: end */
/** event: begin */
import type { TypeEventRetrievePermissionsData, TypeEventRetrievePermissionsResult } from '../bean/event.retrievePermissions.ts';
import type { EventOn } from 'vona-module-a-event'; 
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-openapischema:retrievePermissions': EventOn<TypeEventRetrievePermissionsData, TypeEventRetrievePermissionsResult>;
  }
}
/** event: end */
/** dto: begin */
export * from '../dto/bootstrap.tsx';
export * from '../dto/permissions.tsx';
import type { IDtoOptionsBootstrap } from '../dto/bootstrap.tsx';
import type { IDtoOptionsPermissions } from '../dto/permissions.tsx';
import 'vona-module-a-web';
declare module 'vona-module-a-web' {
  
    export interface IDtoRecord {
      'a-openapischema:bootstrap': IDtoOptionsBootstrap;
'a-openapischema:permissions': IDtoOptionsPermissions;
    }

  
}
declare module 'vona-module-a-openapischema' {
   
}
/** dto: end */
/** dto: begin */
import type { DtoBootstrap } from '../dto/bootstrap.tsx';
import type { DtoPermissions } from '../dto/permissions.tsx'; 
declare module 'vona-module-a-openapischema' {
  
    export interface IDtoOptionsBootstrap {
      fields?: TypeEntityOptionsFields<DtoBootstrap, IDtoOptionsBootstrap[TypeSymbolKeyFieldsMore]>;
    }

    export interface IDtoOptionsPermissions {
      fields?: TypeEntityOptionsFields<DtoPermissions, IDtoOptionsPermissions[TypeSymbolKeyFieldsMore]>;
    }
}
/** dto: end */
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
declare module 'vona-module-a-web' {
  export interface IApiPathGetRecord{
        '/openapischema/resource/bootstrap/:resource': undefined;
    }

}

/** controller: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAOpenapischema extends BeanScopeBase {}

export interface ScopeModuleAOpenapischema {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
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
  
  export interface IBeanScopeConfig {
    'a-openapischema': ReturnType<typeof config>;
  }

  

  
}
/** scope: end */
