import { BeanBase } from './beanBase.js';

const BeanModuleScope = Symbol('BeanModuleScopeBase#ModuleScope');

export class BeanModuleScopeBase<T = unknown> extends BeanBase<T> {
  private [BeanModuleScope]?: string;

  constructor(moduleScope?: string) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected get moduleScope() {
    return this[BeanModuleScope] || this.ctx.module.info.relativeName;
  }

  // other module's bean
  module(moduleScope: string): typeof this {
    return this.bean._getBeanSelector((<any>this).__beanFullName__, moduleScope);
  }
}
