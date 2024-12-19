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
declare module 'vona-module-a-baselayout' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleABaselayout;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/layout.js';
export * from '../entity/layoutContent.js';
export * from '../entity/layoutFull.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-baselayout:layout': IDecoratorEntityOptions;
    'a-baselayout:layoutContent': IDecoratorEntityOptions;
    'a-baselayout:layoutFull': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-baselayout' {}
/** entity: end */
/** entity: begin */
import { EntityLayout } from '../entity/layout.js';
import { EntityLayoutContent } from '../entity/layoutContent.js';
import { EntityLayoutFull } from '../entity/layoutFull.js';
export interface IModuleEntity {
  layout: EntityLayout;
  layoutContent: EntityLayoutContent;
  layoutFull: EntityLayoutFull;
}
/** entity: end */
/** entity: begin */
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
/** entity: end */
/** model: begin */
export * from '../model/layout.js';
export * from '../model/layoutContent.js';
export * from '../model/layoutFull.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-baselayout:layout': IDecoratorModelOptions;
    'a-baselayout:layoutContent': IDecoratorModelOptions;
    'a-baselayout:layoutFull': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-baselayout' {
  export interface ModelLayout {
    /** @internal */
    get scope(): ScopeModuleABaselayout;
  }

  export interface ModelLayoutContent {
    /** @internal */
    get scope(): ScopeModuleABaselayout;
  }

  export interface ModelLayoutFull {
    /** @internal */
    get scope(): ScopeModuleABaselayout;
  }
}
/** model: end */
/** model: begin */
import { ModelLayout } from '../model/layout.js';
import { ModelLayoutContent } from '../model/layoutContent.js';
import { ModelLayoutFull } from '../model/layoutFull.js';
export interface IModuleModel {
  layout: ModelLayout;
  layoutContent: ModelLayoutContent;
  layoutFull: ModelLayoutFull;
}
/** model: end */
/** atom: begin */
export * from '../atom/layout.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'a-baselayout:layout': never;
  }
}
declare module 'vona-module-a-baselayout' {
  export interface AtomLayout {
    /** @internal */
    get scope(): ScopeModuleABaselayout;
  }
}
/** atom: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleABaselayout extends BeanScopeBase {}

export interface ScopeModuleABaselayout {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  entity: IModuleEntity;
  model: IModuleModel;
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
