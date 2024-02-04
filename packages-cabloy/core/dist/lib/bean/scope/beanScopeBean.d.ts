import { BeanSimple } from '../beanSimple.js';
declare const BeanModuleScope: unique symbol;
export declare class BeanScopeBean extends BeanSimple {
    private [BeanModuleScope];
    private __instances;
    constructor(moduleScope: any);
    protected __get__(prop: any): any;
}
export {};
//# sourceMappingURL=beanScopeBean.d.ts.map