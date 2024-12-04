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
/** entity: begin */
export * from '../entity/detailBase.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-detail:detailBase': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/detailBase.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-detail:detailBase': IDecoratorModelOptions;
  }
}
/** model: end */
/** entities: begin */
import { EntityDetailBase } from '../entity/detailBase.js';
export interface IModuleEntity {
  detailBase: EntityDetailBase;
}
/** entities: end */
/** models: begin */
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
  extends TypeModuleResource<
    never,
    never,
    (typeof locales)[TypeLocaleBase],
    typeof constants,
    never,
    IModuleModel,
    IModuleEntity
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-detail': ScopeModuleADetail;
  }

  export interface IBeanScopeContainer {
    detail: ScopeModuleADetail;
  }

  export interface IBeanScopeLocale {
    'a-detail': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-detail:${K}` {
  return `a-detail:${key}`;
}
/** scope: end */
