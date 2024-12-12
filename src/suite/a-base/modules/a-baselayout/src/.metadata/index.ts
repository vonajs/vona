/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-baselayout.version.manager': VersionManager;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/layout.js';
export * from '../entity/layoutContent.js';
export * from '../entity/layoutFull.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-baselayout:layout': IDecoratorEntityOptions;
    'a-baselayout:layoutContent': IDecoratorEntityOptions;
    'a-baselayout:layoutFull': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/layout.js';
export * from '../model/layoutContent.js';
export * from '../model/layoutFull.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-baselayout:layout': IDecoratorModelOptions;
    'a-baselayout:layoutContent': IDecoratorModelOptions;
    'a-baselayout:layoutFull': IDecoratorModelOptions;
  }
}
/** model: end */
/** atoms: begin */
export * from '../atom/layout.js';
/** atoms: end */
/** entities: begin */
import { EntityLayout } from '../entity/layout.js';
import { EntityLayoutContent } from '../entity/layoutContent.js';
import { EntityLayoutFull } from '../entity/layoutFull.js';
export interface IModuleEntity {
  layout: EntityLayout;
  layoutContent: EntityLayoutContent;
  layoutFull: EntityLayoutFull;
}
declare module 'vona-module-a-baselayout' {
  export interface EntityLayout {
    column: <K extends keyof Omit<EntityLayout, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityLayout, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityLayoutContent {
    column: <K extends keyof Omit<EntityLayoutContent, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityLayoutContent, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityLayoutFull {
    column: <K extends keyof Omit<EntityLayoutFull, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityLayoutFull, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entities: end */
/** models: begin */
import { ModelLayout } from '../model/layout.js';
import { ModelLayoutContent } from '../model/layoutContent.js';
import { ModelLayoutFull } from '../model/layoutFull.js';
export interface IModuleModel {
  layout: ModelLayout;
  layoutContent: ModelLayoutContent;
  layoutFull: ModelLayoutFull;
}
/** models: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'vona';

@Scope()
export class ScopeModuleABaselayout extends BeanScopeBase {}

export interface ScopeModuleABaselayout {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  model: IModuleModel;
  entity: IModuleEntity;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-baselayout': ScopeModuleABaselayout;
  }

  export interface IBeanScopeContainer {
    baselayout: ScopeModuleABaselayout;
  }

  export interface IBeanScopeLocale {
    'a-baselayout': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-baselayout:${K}` {
  return `a-baselayout:${key}`;
}
/** scope: end */
