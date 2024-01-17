import { BeanBase } from './beanBase.js';

const BeanModuleCaches = Symbol('BEAN#__BeanModuleCaches');
const BeanModuleScope = Symbol('BEAN#__BeanModuleScope');

export class BeanModuleBase extends BeanBase {
  constructor(moduleScope?: string) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  get moduleScope() {
    return this[BeanModuleScope] || this.ctx.module.info.relativeName;
  }

  // other module's bean
  module(moduleScope) {
    if (!this[BeanModuleCaches]) this[BeanModuleCaches] = new Map();
    let beanInstance = this[BeanModuleCaches].get(moduleScope);
    if (!beanInstance) {
      beanInstance = this.ctx.bean._newBean(this.constructor as any, moduleScope);
      this[BeanModuleCaches].set(moduleScope, beanInstance);
    }
    return beanInstance;
  }
}
