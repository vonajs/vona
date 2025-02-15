/** main: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import type { TypeModuleConfig } from 'vona';

/** filter: begin */
import type { IFilterOptionsError } from '../bean/filter.error.js';
import type { config } from '../config/config.js';
/** service: end */
/** service: begin */

/** service: end */
/** service: begin */
import type { ServiceErrorView } from '../service/errorView.js';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/filter.error.js';
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
export * from '../config/config.js';
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
export * from '../main.js';
/** filter: end */
/** service: begin */
export * from '../service/errorView.js';

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
