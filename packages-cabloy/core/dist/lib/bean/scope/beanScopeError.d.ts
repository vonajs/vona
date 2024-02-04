import { IBeanScopeError } from './type.js';
import { BeanSimple } from '../beanSimple.js';
declare const BeanModuleScope: unique symbol;
export declare class BeanScopeError extends BeanSimple {
    private [BeanModuleScope];
    private __instances;
    constructor(moduleScope: any);
    protected __get__(prop: any): IBeanScopeError;
}
export {};
//# sourceMappingURL=beanScopeError.d.ts.map