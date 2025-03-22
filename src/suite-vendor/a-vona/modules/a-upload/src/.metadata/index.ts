import type { BeanScopeUtil } from 'vona';
/** interceptor: begin */
import type { IInterceptorOptionsUpload } from '../bean/interceptor.upload.ts';
/** interceptor: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';

import 'vona';

export * from '../bean/interceptor.upload.ts';
declare module 'vona-module-a-aspect' {

  export interface IInterceptorRecordLocal {
    'a-upload:upload': IInterceptorOptionsUpload;
  }

}
declare module 'vona-module-a-upload' {

  export interface InterceptorUpload {
    /** @internal */
    get scope(): ScopeModuleAUpload;
  }
}

@Scope()
export class ScopeModuleAUpload extends BeanScopeBase {}

export interface ScopeModuleAUpload {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-upload': ScopeModuleAUpload;
  }

  export interface IBeanScopeContainer {
    upload: ScopeModuleAUpload;
  }

}

/** scope: end */
