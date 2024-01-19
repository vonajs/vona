import { BeanScopeScene } from './beanScopeScene.js';
import { BeanSimple } from './beanSimple.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';

const BeanModuleScope = Symbol('BeanScopeBase#ModuleScope');

export class BeanScopeBase extends BeanSimple {
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
    const bean = this.ctx ? this.ctx.bean : this.app.bean;
    return bean._getBeanScope(`${moduleScope}.scope.module`, moduleScope);
  }

  protected __get__(prop) {
    if (!this.__scenes[prop]) {
      const bean = this.ctx ? this.ctx.bean : this.app.bean;
      this.__scenes[prop] = bean._newBean(BeanScopeScene, this[BeanModuleScope], prop);
    }
    return this.__scenes[prop];
  }
}
