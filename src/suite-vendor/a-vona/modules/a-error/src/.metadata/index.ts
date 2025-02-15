/** filter: begin */
export * from '../bean/filter.error.js';
import type { IFilterOptionsError } from '../bean/filter.error.js';
import 'vona';
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
/** filter: end */
/** service: begin */
export * from '../service/errorView.js';

import 'vona';
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
/** service: end */
/** service: begin */
import type { ServiceErrorView } from '../service/errorView.js';
export interface IModuleService {
  errorView: ServiceErrorView;
}
/** service: end */
/** service: begin */

import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-error.service.errorView': ServiceErrorView;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
import type { config } from '../config/config.js';
/** config: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import { BeanScopeBase, type TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAError extends BeanScopeBase {}

export interface ScopeModuleAError {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
}

import 'vona';
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
