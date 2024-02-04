import { BeanSimple } from './beanSimple.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';
export declare class BeanBase<TScopeModule = unknown> extends BeanSimple {
    private __beanFullName__;
    private __moduleBelong__?;
    constructor(moduleBelong?: string);
    protected get moduleBelong(): string;
    get scope(): TScopeModule;
    getScope<K extends TypeBeanScopeRecordKeys>(moduleScope: K): IBeanScopeRecord[K];
    getScope<T>(moduleScope: string): T;
    getScope(): TScopeModule;
}
//# sourceMappingURL=beanBase.d.ts.map