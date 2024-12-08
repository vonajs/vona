/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-swiper.version.manager': VersionManager;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleASwiper extends BeanScopeBase {}

export interface ScopeModuleASwiper {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-swiper': ScopeModuleASwiper;
  }

  export interface IBeanScopeContainer {
    swiper: ScopeModuleASwiper;
  }
}

/** scope: end */
