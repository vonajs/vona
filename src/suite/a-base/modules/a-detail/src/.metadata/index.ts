/** beans: begin */
export * from '../bean/bean.detail.js';
export * from '../bean/version.manager.js';
import { BeanDetail } from '../bean/bean.detail.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    detail: BeanDetail;
  }

  export interface IBeanRecordGeneral {
    'a-detail.version.manager': VersionManager;
  }
}
/** beans: end */
/** entities: begin */
export * from '../entity/detailBase.js';
/** entities: end */
/** models: begin */
export * from '../model/detailBase.js';
import { ModelDetailBase } from '../model/detailBase.js';
export interface IModuleModel {
  detailBase: ModelDetailBase;
}
/** models: end */
/** constant: begin */
export * from '../config/constants.js';
import { constants } from '../config/constants.js';
/** constant: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleADetail extends BeanScopeBase {}

export interface ScopeModuleADetail
  extends TypeModuleResource<any, any, (typeof locales)[TypeLocaleBase], typeof constants, any, IModuleModel> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-detail': ScopeModuleADetail;
  }

  export interface BeanScopeContainer {
    detail: ScopeModuleADetail;
  }

  export interface IBeanScopeLocale {
    'a-detail': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
