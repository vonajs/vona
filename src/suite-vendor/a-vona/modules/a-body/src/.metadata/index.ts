import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
/** bean: end */
/** bean: begin */
import type { BeanBody } from '../bean/bean.body.ts';

/** interceptor: end */
/** bean: begin */
import type { IInterceptorOptionsBody } from '../bean/interceptor.body.ts';
import type { config } from '../config/config.ts';
/** service: end */
/** service: begin */
import type { ServiceBody } from '../service/body.ts';

/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
/** service: end */
/** service: begin */

import 'vona';
import 'vona';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/bean.body.ts';
declare module 'vona-module-a-aspect' {

  export interface IInterceptorRecordGlobal {
    'a-body:body': IInterceptorOptionsBody;
  }

}
declare module 'vona-module-a-body' {

  export interface InterceptorBody {
    /** @internal */
    get scope(): ScopeModuleABody;
  }
}
/** interceptor: begin */
export * from '../bean/interceptor.body.ts';
declare module 'vona' {

}
declare module 'vona-module-a-body' {

  export interface BeanBody {
    /** @internal */
    get scope(): ScopeModuleABody;
  }
}
declare module 'vona' {
  export interface IBeanRecordGlobal {
    body: BeanBody;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona-module-a-web' {

  export interface IServiceRecord {
    'a-body:body': never;
  }

}
declare module 'vona-module-a-body' {

  export interface ServiceBody {
    /** @internal */
    get scope(): ScopeModuleABody;
  }
}
export interface IModuleService {
  body: ServiceBody;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-body.service.body': ServiceBody;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/body.ts';

@Scope()
export class ScopeModuleABody extends BeanScopeBase {}

export interface ScopeModuleABody {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-body': ScopeModuleABody;
  }

  export interface IBeanScopeContainer {
    body: ScopeModuleABody;
  }

  export interface IBeanScopeConfig {
    'a-body': ReturnType<typeof config>;
  }

}

/** scope: end */
