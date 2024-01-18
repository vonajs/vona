import { appResource } from '../../core/resource.js';
import { BeanBase } from './beanBase.js';

const BeanModuleScope = Symbol('BEAN#__BeanModuleScope');

export class BeanModuleScopeBase extends BeanBase {
  [BeanModuleScope]?: string;

  constructor(moduleScope?: string) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  get moduleScope() {
    if (this[BeanModuleScope]) return this[BeanModuleScope];
    const beanOptions = appResource.getBean(this.constructor as any);
    if (!beanOptions || !beanOptions.moduleScope) throw new Error(`not found module scope: ${this.constructor.name}`);
    return beanOptions.moduleScope;
  }

  // other module's bean
  module(moduleScope: string) {
    const bean = this.ctx ? this.ctx.bean : this.app.bean;
    return bean._getBeanScope(this.constructor as any, moduleScope);
  }
}
