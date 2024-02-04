declare function _exports(ctx: any): {
    util: {
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
        performAction({ innerAccess, method, url, query, params, headers, body }: string): Promise<any>;
        getDbOriginal(): any;
        createDatabase(): any;
    };
    mockUtil: {
        login({ auth, password }: {
            auth: any;
            password?: string | undefined;
        }): Promise<any>;
        logout(): Promise<any>;
        catchError(fnMethod: any, fnError: any): Promise<any>;
    };
};
export = _exports;
//# sourceMappingURL=metaCtx.d.ts.map