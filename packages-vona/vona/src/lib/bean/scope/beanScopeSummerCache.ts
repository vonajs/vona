import { BeanSimple } from '../beanSimple.js';

const BeanModuleScope = Symbol('BeanScopeSummerCache#ModuleScope');

export class BeanScopeSummerCache extends BeanSimple {
  private [BeanModuleScope]: string;

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected __get__(prop: string) {
    return this.app.bean._getBean(`${this[BeanModuleScope]}.summerCache.${prop}` as any);
  }
}
