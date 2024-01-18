import { BeanBase } from './beanBase.js';

const BeanModuleScope = Symbol('BEAN#__BeanModuleScope');

export class BeanModuleScopeBase extends BeanBase {
  [BeanModuleScope]?: string;

  constructor(moduleScope?: string) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  get moduleScope() {
    return this[BeanModuleScope] || this.ctx.module.info.relativeName;
  }

  // other module's bean
  module(moduleScope: string) {
    const bean = this.ctx ? this.ctx.bean : this.app.bean;
    return bean._getBeanScope(this.constructor as any, moduleScope);
  }
}
