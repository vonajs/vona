import { IBeanScopeError } from './type.js';
import { BeanSimple } from '../beanSimple.js';
import { BeanScopeErrorImpl } from './beanScopeErrorImpl.js';

const BeanModuleScope = Symbol('BeanScopeError#ModuleScope');

export class BeanScopeError extends BeanSimple {
  private [BeanModuleScope]: string;
  private __instances: Record<string, IBeanScopeError> = {};

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected __get__(prop) {
    if (!this.__instances[prop]) {
      this.__instances[prop] = this.bean._newBean(BeanScopeErrorImpl, this[BeanModuleScope], prop);
    }
    return this.__instances[prop];
  }
}
