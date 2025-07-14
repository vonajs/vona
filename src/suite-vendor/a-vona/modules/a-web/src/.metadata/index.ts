/* eslint-disable */
/** bean: begin */
export * from '../bean/bean.router.ts';

import 'vona';
declare module 'vona' {
  
  
}
declare module 'vona-module-a-web' {
  
        export interface BeanRouter {
          /** @internal */
          get scope(): ScopeModuleAWeb;
        } 
}
/** bean: end */
/** bean: begin */
import type { BeanRouter } from '../bean/bean.router.ts';
import 'vona';  
declare module 'vona' {
  export interface IBeanRecordGlobal {
    'router': BeanRouter;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/web.ts';

import 'vona';
declare module 'vona-module-a-bean' {
  
    export interface IServiceRecord {
      'a-web:web': never;
    }

  
}
declare module 'vona-module-a-web' {
  
        export interface ServiceWeb {
          /** @internal */
          get scope(): ScopeModuleAWeb;
        }

          export interface ServiceWeb {
            get $beanFullName(): 'a-web.service.web';
            get $onionName(): 'a-web:web';
          } 
}
/** service: end */
/** service: begin */
import type { ServiceWeb } from '../service/web.ts';
export interface IModuleService {
  'web': ServiceWeb;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-web.service.web': ServiceWeb;
  }
}
/** service: end */
/** startup: begin */
export * from '../bean/startup.listen.ts';

import { type IDecoratorStartupOptions } from 'vona-module-a-startup';
declare module 'vona-module-a-startup' {
  
    export interface IStartupRecord {
      'a-web:listen': IDecoratorStartupOptions;
    }

  
}
declare module 'vona-module-a-web' {
  
        export interface StartupListen {
          /** @internal */
          get scope(): ScopeModuleAWeb;
        }

          export interface StartupListen {
            get $beanFullName(): 'a-web.startup.listen';
            get $onionName(): 'a-web:listen';
          } 
}
/** startup: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** main: begin */
export * from '../main.ts';
/** main: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAWeb extends BeanScopeBase {}

export interface ScopeModuleAWeb {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-web': ScopeModuleAWeb;
  }

  export interface IBeanScopeContainer {
    web: ScopeModuleAWeb;
  }
  
  export interface IBeanScopeConfig {
    'a-web': ReturnType<typeof config>;
  }

  
}

/** scope: end */
