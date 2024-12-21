import { BeanBase } from './beanBase.js';

const BeanModuleScope = Symbol('BeanModuleScopeBase#ModuleScope');

export class BeanModuleScopeBase extends BeanBase {
  private [BeanModuleScope]?: string;

  constructor(moduleScope?: string) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected get moduleScope() {
    return this[BeanModuleScope];
  }

  // other module's bean
  module(moduleScope: string): typeof this {
    return this.bean._getBeanSelector((<any>this).__beanFullName__, moduleScope);
  }
}
