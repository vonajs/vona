import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
import type { IDecoratorStartupOptions } from 'vona-module-a-startup';
/** bean: end */
/** bean: begin */
import type { BeanRouter } from '../bean/bean.router.ts';

import type { config } from '../config/config.ts';
/** service: end */
/** service: begin */
import type { ServiceWeb } from '../service/web.ts';

/** main: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** service: end */
/** service: begin */

/** bean: begin */
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.router.ts';
declare module 'vona' {

}
declare module 'vona-module-a-web' {

  export interface BeanRouter {
    /** @internal */
    get scope(): ScopeModuleAWeb;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    router: BeanRouter;
  }
}
/** bean: end */
/** startup: begin */
export * from '../bean/startup.listen.ts';
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
}
/** service: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-web:web': never;
  }

}
declare module 'vona-module-a-web' {

  export interface ServiceWeb {
    /** @internal */
    get scope(): ScopeModuleAWeb;
  }
}
export interface IModuleService {
  web: ServiceWeb;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-web.service.web': ServiceWeb;
  }
}
/** config: end */
/** main: begin */
export * from '../main.ts';
/** startup: end */
/** service: begin */
export * from '../service/web.ts';

@Scope()
export class ScopeModuleAWeb extends BeanScopeBase {}

export interface ScopeModuleAWeb {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}
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
