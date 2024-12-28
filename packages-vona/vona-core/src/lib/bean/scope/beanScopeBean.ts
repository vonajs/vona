import { BeanSimple } from '../beanSimple.js';

const BeanModuleScope = Symbol('BeanScopeScene#ModuleScope');

export class BeanScopeBean extends BeanSimple {
  private [BeanModuleScope]: string;
  private __instances: Record<string, any> = {};

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected __get__(prop: string) {
    if (!this.__instances[prop]) {
      const beanFullName = prop;
      this.__instances[prop] = (<any>this.bean)._injectBeanInstanceProp(beanFullName, this[BeanModuleScope]);
    }
    return this.__instances[prop];
  }
}
