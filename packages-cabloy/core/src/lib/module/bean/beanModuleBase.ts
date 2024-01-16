import { BeanBase } from './beanBase.js';

const BeanModuleCaches = Symbol('BEAN#__BeanModuleCaches');

export class BeanModuleBase extends BeanBase {
  __moduleName: string;

  constructor(moduleName) {
    super();
    this.__moduleName = moduleName;
  }

  get moduleName() {
    return this.__moduleName || this.ctx.module.info.relativeName;
  }

  // other module's bean
  module(moduleName) {
    if (!this[BeanModuleCaches]) this[BeanModuleCaches] = new Map();
    let beanInstance = this[BeanModuleCaches].get(moduleName);
    if (!beanInstance) {
      beanInstance = this.ctx.bean._newBean(this.constructor as any, moduleName);
      this[BeanModuleCaches].set(moduleName, beanInstance);
    }
    return beanInstance;
  }
}
