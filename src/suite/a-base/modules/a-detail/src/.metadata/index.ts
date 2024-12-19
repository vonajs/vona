/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-detail.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-detail' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleADetail;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/detailBase.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-detail:detailBase': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-detail' {}
/** entity: end */
/** entity: begin */
import { EntityDetailBase } from '../entity/detailBase.js';
export interface IModuleEntity {
  detailBase: EntityDetailBase;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-detail' {
  export interface EntityDetailBase {
    column: <K extends keyof Omit<EntityDetailBase, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityDetailBase, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/detailBase.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-detail:detailBase': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-detail' {
  export interface ModelDetailBase {
    /** @internal */
    get scope(): ScopeModuleADetail;
  }
}
/** model: end */
/** model: begin */
import { ModelDetailBase } from '../model/detailBase.js';
export interface IModuleModel {
  detailBase: ModelDetailBase;
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.detail.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-detail' {
  export interface BeanDetail {
    /** @internal */
    get scope(): ScopeModuleADetail;
  }
}
/** bean: end */
/** bean: begin */
import { BeanDetail } from '../bean/bean.detail.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    detail: BeanDetail;
  }
}
/** bean: end */
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
import {
  BeanScopeBase,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleLocales,
  TypeLocaleBase,
  TypeModuleConstants,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleADetail extends BeanScopeBase {}

export interface ScopeModuleADetail {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  constant: TypeModuleConstants<typeof constants>;
  entity: IModuleEntity;
  model: IModuleModel;
}

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
