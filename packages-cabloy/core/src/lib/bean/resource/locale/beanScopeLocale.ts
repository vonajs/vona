import { IModuleLocale } from './type.js';
import { BeanScopeLocaleImpl } from './beanScopeLocaleImpl.js';
import { BeanSimple } from '../../beanSimple.js';

const BeanModuleScope = Symbol('BeanScopeError#ModuleScope');

export class BeanScopeLocale extends BeanSimple {
  private [BeanModuleScope]: string;
  private __instances: Record<string, IModuleLocale> = {};

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected __get__(prop) {
    if (!this.__instances[prop]) {
      this.__instances[prop] = BeanScopeLocaleImpl(this.ctx, this[BeanModuleScope], prop);
    }
    return this.__instances[prop];
  }
}
