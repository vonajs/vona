import Redlock from 'redlock';
import { CabloyContext } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { IModuleMiddlewareGate } from '../bean/index.js';
export interface IExecuteBeanCallbackParams {
    ctx: CabloyContext;
    bean: any;
    context: any;
}
export interface IExecuteBeanCallback {
    (params: IExecuteBeanCallbackParams): Promise<any>;
}
export declare class AppUtil extends BeanSimple {
    instanceStarted(subdomain: any): any;
    combineFetchPath(moduleName: any, arg: any): any;
    combineApiPath(moduleName: any, arg: any): any;
    combineQueries(url: any, queries: any): any;
    createError(data: any, returnObject?: boolean): any;
    monkeyModule(ebAppMonkey: any, ebModulesMonkey: any, monkeyName: any, monkeyData: any): Promise<void>;
    getWhiteListCors(ctx: any): any;
    isSafeDomain(ctx: any, origin: any): boolean;
    compose(chains: any, adapter: any): (context: any, next?: any) => any;
    composeAsync(chains: any, adapter: any): (context: any, next?: any) => Promise<any>;
    createAnonymousContext({ locale, subdomain, module, instance }: {
        locale: any;
        subdomain: any;
        module: any;
        instance: any;
    }): Promise<CabloyContext>;
    executeBean({ locale, subdomain, beanModule, beanFullName, context, fn, transaction, ctxCaller, ctxParent, instance, }: {
        locale?: string;
        subdomain?: string;
        beanModule?: string;
        beanFullName?: string;
        context: any;
        fn?: any;
        transaction?: boolean;
        ctxCaller?: CabloyContext;
        ctxParent?: Partial<CabloyContext>;
        instance?: boolean;
    }): Promise<any>;
    _executeBeanFn({ fn, ctx, bean, context }: {
        fn: any;
        ctx: any;
        bean: any;
        context: any;
    }): Promise<any>;
    lock({ subdomain, resource, fn, options, redlock, }: {
        subdomain?: string;
        resource: string;
        fn: () => Promise<any>;
        options: any;
        redlock?: Redlock;
    }): Promise<any>;
    subdomainDesp(subdomain: any): any;
    deprecated(oldUsage: any, newUsage: any): void;
    checkGate(gate?: IModuleMiddlewareGate): boolean;
    _checkGateEnv(env?: IModuleMiddlewareGate['env']): boolean;
    requireDynamic(file: any): any;
    private _requireDynamic_getFileTime;
}
//# sourceMappingURL=util.d.ts.map