import { BeanSimple } from './beanSimple.js';

const BeanModuleScope = Symbol('BeanScopeScene#ModuleScope');
const BeanModuleScene = Symbol('BeanScopeScene#BeanModuleScene');

export class BeanScopeScene extends BeanSimple {
  private [BeanModuleScope]: string;
  private [BeanModuleScene]: string;
  private __instances: Record<string, any> = {};

  constructor(moduleScope, scene) {
    super();
    this[BeanModuleScope] = moduleScope;
    this[BeanModuleScene] = scene;
  }

  protected __get__(prop) {
    if (!this.__instances[prop]) {
      const bean = this.ctx ? this.ctx.bean : this.app.bean;
      const beanFullName = `${this[BeanModuleScope]}.${this[BeanModuleScene]}.${prop}`;
      this.__instances[prop] = (<any>bean)._injectBeanInstanceProp(beanFullName);
    }
    return this.__instances[prop];
  }
}
