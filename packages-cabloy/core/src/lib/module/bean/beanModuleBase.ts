import { BeanBase } from './beanBase.js';

const BeanModuleScope = Symbol('BEAN#__BeanModuleScope');

export class BeanModuleBase extends BeanBase {
  [BeanModuleScope]?: string;

  constructor(moduleScope?: string) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  get moduleScope() {
    return this[BeanModuleScope] || this.ctx.module.info.relativeName;
  }

  // other module's bean
  module(moduleScope) {
    return this.ctx.bean._newBeanModule(this.constructor as any, moduleScope);
  }
}
