import { BeanScopeScene } from './beanScopeScene.js';
import { BeanBase } from './beanBase.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';

const BeanModuleScope = Symbol('BeanScopeBase#ModuleScope');

export class BeanScopeBase extends BeanBase {
  private [BeanModuleScope]?: string;
  private __scenes: Record<string, any> = {};

  constructor(moduleScope?: string) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected get moduleScope() {
    return this[BeanModuleScope];
  }

  // other module's bean
  module<K extends TypeBeanScopeRecordKeys>(moduleScope: K): IBeanScopeRecord[K] {
    return this.bean._getBeanScope(`${moduleScope}.scope.module`, moduleScope);
  }

  protected __get__(prop) {
    if (!this.__scenes[prop]) {
      this.__scenes[prop] = this.bean._newBean(BeanScopeScene, this[BeanModuleScope], prop);
    }
    return this.__scenes[prop];
  }
}
