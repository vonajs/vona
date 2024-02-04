import { BeanBase } from './beanBase.js';
declare const BeanModuleScope: unique symbol;
export declare class BeanModuleScopeBase<T = unknown> extends BeanBase<T> {
    private [BeanModuleScope]?;
    constructor(moduleScope?: string);
    protected get moduleScope(): string;
    module(moduleScope: string): typeof this;
}
export {};
//# sourceMappingURL=beanModuleScopeBase.d.ts.map