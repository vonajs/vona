import { BeanScopeScene } from './beanScopeScene.js';
import { BeanBase } from './beanBase.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';

export class BeanScopeBase extends BeanBase {
  private __scenes: Record<string, any> = {};

  // other module's bean
  module<K extends TypeBeanScopeRecordKeys>(moduleScope: K): IBeanScopeRecord[K] {
    return this.bean._getBean(`${moduleScope}.scope.module`);
  }

  protected __get__(prop) {
    if (!this.__scenes[prop]) {
      this.__scenes[prop] = this.bean._newBean(BeanScopeScene, this.moduleBelong, prop);
    }
    return this.__scenes[prop];
  }
}
