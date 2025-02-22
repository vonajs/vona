/** main: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { TypeModuleConfig } from 'vona';

/** filter: begin */
import type { IFilterOptionsError } from '../bean/filter.error.ts';
import type { config } from '../config/config.ts';
/** service: end */
/** service: begin */

/** service: end */
/** service: begin */
import type { ServiceErrorView } from '../service/errorView.ts';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/filter.error.ts';
declare module 'vona-module-a-aspect' {
  export interface IFilterRecordGlobal {
    'a-error:error': IFilterOptionsError;
  }
}
declare module 'vona-module-a-error' {
  export interface FilterError {
    /** @internal */
    get scope(): ScopeModuleAError;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.ts';
declare module 'vona-module-a-web' {
  export interface IServiceRecord {
    'a-error:errorView': never;
  }
}
declare module 'vona-module-a-error' {
  export interface ServiceErrorView {
    /** @internal */
    get scope(): ScopeModuleAError;
  }
}
export interface IModuleService {
  errorView: ServiceErrorView;
}
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-error.service.errorView': ServiceErrorView;
  }
}
/** config: end */
/** main: begin */
export * from '../main.ts';
/** filter: end */
/** service: begin */
export * from '../service/errorView.ts';

@Scope()
export class ScopeModuleAError extends BeanScopeBase {}

export interface ScopeModuleAError {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-error': ScopeModuleAError;
  }

  export interface IBeanScopeContainer {
    error: ScopeModuleAError;
  }

  export interface IBeanScopeConfig {
    'a-error': ReturnType<typeof config>;
  }
}

/** scope: end */
