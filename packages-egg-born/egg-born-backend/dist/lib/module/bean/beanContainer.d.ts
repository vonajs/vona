declare function _exports(app: any, ctx: any): {
    _register(moduleName: any, beanName: any, beanClass: any): any;
    _registerAop(moduleName: any, aopName: any, aopClass: any): any;
    _getBeanClass(beanFullName: any): any;
    _getBean(moduleName: any, beanName: any): any;
    _newBean(beanFullName: any, ...args: any[]): any;
    _patchBeanInstance(beanInstance: any, args: any, beanFullName: any, isAop: any): any;
    _newBeanProxy(beanFullName: any, beanInstance: any): any;
    _getInstanceMethodProxy(beanFullName: any, beanInstance: any, prop: any, methodType: any): any;
    _prepareAopChains(beanFullName: any, beanInstance: any): any;
    _getAopChains(beanFullName: any): any;
    _getAopChainsProp(beanFullName: any, methodName: any, methodNameMagic: any): any;
};
export = _exports;
//# sourceMappingURL=beanContainer.d.ts.map