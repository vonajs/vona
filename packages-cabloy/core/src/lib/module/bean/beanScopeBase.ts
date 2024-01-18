import { appResource } from '../../core/resource.js';
import { BeanSimple } from './beanSimple.js';

const BeanModuleScope = Symbol('BeanScopeBase#ModuleScope');

export class BeanScopeBase extends BeanSimple {
  [BeanModuleScope]?: string;

  constructor(moduleScope?: string) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  get moduleBelong() {
    return appResource._getModuleBelong(this.constructor as any);
  }

  get moduleScope() {
    return this[BeanModuleScope] || this.moduleBelong;
  }

  // other module's bean
  module(moduleScope: string) {
    const bean = this.ctx ? this.ctx.bean : this.app.bean;
    return bean._getBeanScope(this.constructor as any, moduleScope);
  }
}
