declare function _exports(ctx: any): {
    runInBackground(scope: any): void;
    lock({ subdomain, resource, fn, options, redlock }: {
        subdomain: any;
        resource: any;
        fn: any;
        options: any;
        redlock: any;
    }): Promise<any>;
    broadcastEmit({ locale, subdomain, module, broadcastName, data }: {
        locale: any;
        subdomain: any;
        module: any;
        broadcastName: any;
        data: any;
    }): void;
    queuePush(info: any): void;
    queuePushAsync(info: any): Promise<any>;
    _queuePushInfoPrepare(info: any): any;
    executeBeanAuto({ beanModule, beanFullName, context, fn }: {
        beanModule: any;
        beanFullName: any;
        context: any;
        fn: any;
    }): Promise<any>;
    executeBean({ locale, subdomain, beanModule, beanFullName, context, fn, transaction, instance }: {
        locale: any;
        subdomain: any;
        beanModule: any;
        beanFullName: any;
        context: any;
        fn: any;
        transaction: any;
        instance: any;
    }): Promise<any>;
    executeBeanIsolate({ locale, subdomain, beanModule, beanFullName, context, fn, transaction, ctxParent, instance, }: {
        locale: any;
        subdomain: any;
        beanModule: any;
        beanFullName: any;
        context: any;
        fn: any;
        transaction: any;
        ctxParent: any;
        instance: any;
    }): Promise<any>;
    /**
     * perform action of this or that module
     * @param  {string} options options
     * @param  {string} options.method method
     * @param  {string} options.url    url
     * @param  {json} options.body   body(optional)
     * @return {promise}                response.body.data or throw error
     */
    performAction({ innerAccess, method, url, query, params, headers, body }: string): Promise<any>;
    getDbOriginal(): any;
    createDatabase(): any;
};
export = _exports;
//# sourceMappingURL=utilCtx.d.ts.map