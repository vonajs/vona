import { IErrorObject } from '../../resource/error/errorObject.js';
import { BeanSimple } from '../beanSimple.js';
import { IBeanScopeError } from './type.js';

const BeanModuleScope = Symbol('BeanScopeError#ModuleScope');
const BeanErrorCode = Symbol('BeanScopeError#BeanErrorCode');

export class BeanScopeErrorImpl extends BeanSimple implements IBeanScopeError {
  private [BeanModuleScope]: string;
  private [BeanErrorCode]: number | string;

  constructor(moduleScope, errorCode) {
    super();
    this[BeanModuleScope] = moduleScope;
    this[BeanErrorCode] = errorCode;
  }

  throw(...args: any[]): never {
    this.ctx.throw.module(this[BeanModuleScope], this[BeanErrorCode], ...args);
  }

  parseFail(...args: any[]): IErrorObject {
    return this.ctx.parseFail.module(this[BeanModuleScope], this[BeanErrorCode], ...args);
  }
}
