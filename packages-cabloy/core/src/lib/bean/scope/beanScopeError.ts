import { IErrorObject } from '../../error/errorObject.js';
import { BeanSimple } from '../beanSimple.js';

export interface IBeanScopeError {
  throw(...args: any[]): never;
  parseFail(...args: any[]): IErrorObject;
}

export type TypeBeanScopeError<T> = {
  [prop in string & keyof T]: IBeanScopeError;
};

const BeanModuleScope = Symbol('BeanScopeError#ModuleScope');

export class BeanScopeError extends BeanSimple {
  private [BeanModuleScope]: string;
  private __instances: Record<string, any> = {};

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  protected __get__(prop) {
    if (!this.__instances[prop]) {
      const beanFullName = `${this[BeanModuleScope]}.${this[BeanModuleScene]}.${prop}`;
      this.__instances[prop] = (<any>this.bean)._injectBeanInstanceProp(beanFullName);
    }
    return this.__instances[prop];
  }
}
