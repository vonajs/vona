/** beans: begin */
export * from '../bean/flow.service.startEventTimer.js';
export * from '../bean/flow.service.test.js';
export * from '../bean/version.manager.js';
import { FlowServiceStartEventTimer } from '../bean/flow.service.startEventTimer.js';
import { FlowServiceTest } from '../bean/flow.service.test.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'test-flow.flow.service.startEventTimer': FlowServiceStartEventTimer;
    'test-flow.flow.service.test': FlowServiceTest;
    'test-flow.version.manager': VersionManager;
  }
}
declare module 'vona-module-test-flow' {
  export interface FlowServiceStartEventTimer {
    /** @internal */
    get scope(): ScopeModuleTestFlow;
  }

  export interface FlowServiceTest {
    /** @internal */
    get scope(): ScopeModuleTestFlow;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleTestFlow;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/product.js';
export * from '../entity/purchaseOrder.js';
export * from '../entity/purchaseOrderDetail.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'test-flow:product': IDecoratorEntityOptions;
    'test-flow:purchaseOrder': IDecoratorEntityOptions;
    'test-flow:purchaseOrderDetail': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-test-flow' {}
/** entity: end */
/** entity: begin */
import { EntityProduct } from '../entity/product.js';
import { EntityPurchaseOrder } from '../entity/purchaseOrder.js';
import { EntityPurchaseOrderDetail } from '../entity/purchaseOrderDetail.js';
export interface IModuleEntity {
  product: EntityProduct;
  purchaseOrder: EntityPurchaseOrder;
  purchaseOrderDetail: EntityPurchaseOrderDetail;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-test-flow' {
  export interface EntityProduct {
    column: <K extends keyof Omit<EntityProduct, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityProduct, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityPurchaseOrder {
    column: <K extends keyof Omit<EntityPurchaseOrder, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityPurchaseOrder, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityPurchaseOrderDetail {
    column: <K extends keyof Omit<EntityPurchaseOrderDetail, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityPurchaseOrderDetail, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/product.js';
export * from '../model/purchaseOrder.js';
export * from '../model/purchaseOrderDetail.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'test-flow:product': IDecoratorModelOptions;
    'test-flow:purchaseOrder': IDecoratorModelOptions;
    'test-flow:purchaseOrderDetail': IDecoratorModelOptions;
  }
}
declare module 'vona-module-test-flow' {
  export interface ModelProduct {
    /** @internal */
    get scope(): ScopeModuleTestFlow;
  }

  export interface ModelPurchaseOrder {
    /** @internal */
    get scope(): ScopeModuleTestFlow;
  }

  export interface ModelPurchaseOrderDetail {
    /** @internal */
    get scope(): ScopeModuleTestFlow;
  }
}
/** model: end */
/** model: begin */
import { ModelProduct } from '../model/product.js';
import { ModelPurchaseOrder } from '../model/purchaseOrder.js';
import { ModelPurchaseOrderDetail } from '../model/purchaseOrderDetail.js';
export interface IModuleModel {
  product: ModelProduct;
  purchaseOrder: ModelPurchaseOrder;
  purchaseOrderDetail: ModelPurchaseOrderDetail;
}
/** model: end */
/** atom: begin */
export * from '../atom/product.js';
export * from '../atom/purchaseOrder.js';
export * from '../atom/purchaseOrderDetail.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'test-flow:product': never;
    'test-flow:purchaseOrder': never;
    'test-flow:purchaseOrderDetail': never;
  }
}
declare module 'vona-module-test-flow' {
  export interface AtomProduct {
    /** @internal */
    get scope(): ScopeModuleTestFlow;
  }

  export interface AtomPurchaseOrder {
    /** @internal */
    get scope(): ScopeModuleTestFlow;
  }

  export interface AtomPurchaseOrderDetail {
    /** @internal */
    get scope(): ScopeModuleTestFlow;
  }
}
/** atom: end */
/** controller: begin */
export * from '../controller/flow.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'test-flow:flow': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-test-flow' {
  export interface ControllerFlow {
    /** @internal */
    get scope(): ScopeModuleTestFlow;
  }
}
/** controller: end */
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
export class ScopeModuleTestFlow extends BeanScopeBase {}

export interface ScopeModuleTestFlow {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  entity: IModuleEntity;
  model: IModuleModel;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'test-flow': ScopeModuleTestFlow;
  }

  export interface IBeanScopeContainer {
    testFlow: ScopeModuleTestFlow;
  }

  export interface IBeanScopeLocale {
    'test-flow': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `test-flow:${K}` {
  return `test-flow:${key}`;
}
/** scope: end */
