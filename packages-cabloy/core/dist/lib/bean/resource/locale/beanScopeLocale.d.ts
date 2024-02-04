import { IModuleLocale } from './type.js';
import { BeanSimple } from '../../beanSimple.js';
declare const BeanModuleScope: unique symbol;
export declare class BeanScopeLocale extends BeanSimple {
    private [BeanModuleScope];
    private __instances;
    constructor(moduleScope: any);
    protected __get__(prop: any): IModuleLocale;
}
export {};
//# sourceMappingURL=beanScopeLocale.d.ts.map