/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAPrintapipath extends BeanScopeBase {}

export interface ScopeModuleAPrintapipath {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-printapipath': ScopeModuleAPrintapipath;
  }

  export interface IBeanScopeContainer {
    printapipath: ScopeModuleAPrintapipath;
  }
}

/** scope: end */
