import { BeanBase } from '../beanBase.js';
import { IModule } from '@cabloy/module-info';
declare const BeanModuleError: unique symbol;
declare const BeanModuleLocale: unique symbol;
declare const BeanModuleConfig: unique symbol;
declare const BeanModuleConstant: unique symbol;
declare const BeanModuleBean: unique symbol;
export declare class BeanScopeBase extends BeanBase {
    private [BeanModuleError];
    private [BeanModuleLocale];
    private [BeanModuleConfig];
    private [BeanModuleConstant];
    private [BeanModuleBean];
    private __scenes;
    get module(): IModule;
    protected __get__(prop: any): unknown;
}
export {};
//# sourceMappingURL=beanScopeBase.d.ts.map