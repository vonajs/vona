declare function _exports(app: any): {
    instanceStarted(subdomain: any): any;
    combineFetchPath(moduleName: any, arg: any): any;
    combineApiPath(moduleName: any, arg: any): any;
    combineQueries(url: any, queries: any): any;
    createError(data: any, returnObject: any): {};
    monkeyModule(ebAppMonkey: any, ebModulesMonkey: any, monkeyName: any, monkeyData: any): void;
    getWhiteListCors(ctx: any): any;
    isSafeDomain(ctx: any, origin: any): boolean;
    compose(chains: any, adapter: any): (context: any, next: any) => any;
    composeAsync(chains: any, adapter: any): (context: any, next: any) => Promise<any>;
    createAnonymousContext({ locale, subdomain, module, instance }: {
        locale: any;
        subdomain: any;
        module: any;
        instance: any;
    }): Promise<any>;
    executeBean({ locale, subdomain, beanModule, beanFullName, context, fn, transaction, ctxCaller, ctxParent, instance, }: {
        locale: any;
        subdomain: any;
        beanModule: any;
        beanFullName: any;
        context: any;
        fn: any;
        transaction: any;
        ctxCaller: any;
        ctxParent: any;
        instance: any;
    }): Promise<any>;
    _executeBeanFn({ fn, ctx, bean, context }: {
        fn: any;
        ctx: any;
        bean: any;
        context: any;
    }): Promise<any>;
    lock({ subdomain, resource, fn, options, redlock }: {
        subdomain: any;
        resource: any;
        fn: any;
        options: any;
        redlock: any;
    }): Promise<any>;
    mixinClasses(classMain: any, classesMore: any, ...args: any[]): any;
    subdomainDesp(subdomain: any): any;
    deprecated(oldUsage: any, newUsage: any): void;
    requireDynamic(file: any): any;
    _requireDynamic_getFileTime(file: any): any;
};
export = _exports;
//# sourceMappingURL=util.d.ts.map