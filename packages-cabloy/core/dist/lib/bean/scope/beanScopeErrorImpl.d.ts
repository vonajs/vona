import { IErrorObject } from '../resource/error/errorObject.js';
import { BeanSimple } from '../beanSimple.js';
import { IBeanScopeError } from './type.js';
declare const BeanModuleScope: unique symbol;
declare const BeanErrorCode: unique symbol;
export declare class BeanScopeErrorImpl extends BeanSimple implements IBeanScopeError {
    private [BeanModuleScope];
    private [BeanErrorCode];
    constructor(moduleScope: any, errorCode: any);
    throw(...args: any[]): never;
    parseFail(...args: any[]): IErrorObject;
}
export {};
//# sourceMappingURL=beanScopeErrorImpl.d.ts.map