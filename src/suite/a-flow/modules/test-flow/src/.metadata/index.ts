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
/** beans: end */
/** entity: begin */
export * from '../entity/product.js';
export * from '../entity/purchaseOrder.js';
export * from '../entity/purchaseOrderDetail.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'test-flow:product': IDecoratorEntityOptions;
    'test-flow:purchaseOrder': IDecoratorEntityOptions;
    'test-flow:purchaseOrderDetail': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/product.js';
export * from '../model/purchaseOrder.js';
export * from '../model/purchaseOrderDetail.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'test-flow:product': IDecoratorModelOptions;
    'test-flow:purchaseOrder': IDecoratorModelOptions;
    'test-flow:purchaseOrderDetail': IDecoratorModelOptions;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/flow.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'test-flow:flow': IDecoratorControllerOptions;
  }
}
/** controller: end */
/** atoms: begin */
export * from '../atom/product.js';
export * from '../atom/purchaseOrder.js';
export * from '../atom/purchaseOrderDetail.js';
/** atoms: end */
/** entities: begin */
import { EntityProduct } from '../entity/product.js';
import { EntityPurchaseOrder } from '../entity/purchaseOrder.js';
import { EntityPurchaseOrderDetail } from '../entity/purchaseOrderDetail.js';
export interface IModuleEntity {
  product: EntityProduct;
  purchaseOrder: EntityPurchaseOrder;
  purchaseOrderDetail: EntityPurchaseOrderDetail;
}
/** entities: end */
/** models: begin */
import { ModelProduct } from '../model/product.js';
import { ModelPurchaseOrder } from '../model/purchaseOrder.js';
import { ModelPurchaseOrderDetail } from '../model/purchaseOrderDetail.js';
export interface IModuleModel {
  product: ModelProduct;
  purchaseOrder: ModelPurchaseOrder;
  purchaseOrderDetail: ModelPurchaseOrderDetail;
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleTestFlow extends BeanScopeBase {}

export interface ScopeModuleTestFlow
  extends TypeModuleResource<
    never,
    never,
    (typeof locales)[TypeLocaleBase],
    never,
    never,
    never,
    IModuleModel,
    IModuleEntity,
    never
  > {}

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
