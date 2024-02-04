import { CabloyApplication, CabloyContext } from '../../types/index.js';
import { Constructable } from '../decorator/index.js';
import { IBeanRecord, IBeanScopeRecord, TypeBeanRecord, TypeBeanScopeRecordKeys } from './type.js';
declare const BeanContainerInstances: unique symbol;
declare const BeanContainerInstancesModule: unique symbol;
export declare class BeanContainer {
    private app;
    private ctx;
    private [BeanContainerInstances];
    private [BeanContainerInstancesModule];
    constructor(app: CabloyApplication, ctx: CabloyContext);
    /** get specific module's scope */
    scope<K extends TypeBeanScopeRecordKeys>(moduleScope: K): IBeanScopeRecord[K];
    scope<T>(moduleScope: string): T;
    _getBean<T>(A: Constructable<T>): T;
    _getBean<K extends keyof IBeanRecord>(beanFullName: K): IBeanRecord[K];
    _getBean<T>(beanFullName: string): T;
    _getBeanScope<T>(A: Constructable<T>, moduleScope: any): T;
    _getBeanScope<K extends keyof IBeanRecord>(beanFullName: K, moduleScope: any): IBeanRecord[K];
    _getBeanScope<T>(beanFullName: string, moduleScope: any): T;
    _newBean<T>(A: Constructable<T>, ...args: any[]): T;
    _newBean<K extends keyof IBeanRecord>(beanFullName: K, ...args: any[]): IBeanRecord[K];
    _newBean<T>(beanFullName: string, ...args: any[]): T;
    _newBeanScope<T>(A: Constructable<T>, moduleScope: any, ...args: any[]): T;
    _newBeanScope<K extends keyof IBeanRecord>(beanFullName: K, moduleScope: any, ...args: any[]): IBeanRecord[K];
    _newBeanScope<T>(beanFullName: string, moduleScope: any, ...args: any[]): T;
    private _injectBeanInstance;
    private _injectBeanInstancePropLazy;
    private _injectBeanInstanceProp;
    private _patchBeanInstance;
    private _newBeanProxy;
    private _getInstanceMethodProxy;
    private _prepareAopChains;
    private _getAopChains;
    private _getAopChainsProp;
    private __composeForPropAdapter;
    private __composeForProp;
    private __composeForPropAsync;
}
export type BeanContainerLike = TypeBeanRecord & BeanContainer;
export declare function BeanContainerCreate(app: any, ctx: any): BeanContainer;
export {};
//# sourceMappingURL=beanContainer.d.ts.map