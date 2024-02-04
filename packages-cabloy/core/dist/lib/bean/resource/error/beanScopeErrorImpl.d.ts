import { BeanSimple } from '../../beanSimple.js';
import { IErrorObject } from './errorObject.js';
import { IModuleError } from './type.js';
declare const BeanModuleScope: unique symbol;
declare const BeanErrorCode: unique symbol;
export declare class BeanScopeErrorImpl extends BeanSimple implements IModuleError {
    private [BeanModuleScope];
    private [BeanErrorCode];
    constructor(moduleScope: any, errorCode: any);
    throw(...args: any[]): never;
    parseFail(...args: any[]): IErrorObject;
}
export {};
//# sourceMappingURL=beanScopeErrorImpl.d.ts.map