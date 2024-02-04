export = BeanModuleBase;
declare class BeanModuleBase {
    constructor(moduleName: any);
    __moduleName: any;
    get moduleName(): any;
    module(moduleName: any): any;
    [BeanModuleCaches]: Map<any, any> | undefined;
}
declare const BeanModuleCaches: unique symbol;
//# sourceMappingURL=beanModuleBase.d.ts.map