import { BeanSimple } from '../bean/beanSimple.js';
import { CabloyContext } from '../../types/index.js';
import { IExecuteBeanCallback } from './util.js';
export declare class CtxUtil extends BeanSimple {
    runInBackground(scope: any): void;
    lock({ subdomain, resource, fn, options, redlock }: any): Promise<any>;
    broadcastEmit({ locale, subdomain, module, broadcastName, data }: any): void;
    queuePush(info: any): void;
    queuePushAsync(info: any): Promise<unknown>;
    _queuePushInfoPrepare(info: any): any;
    executeBeanAuto({ beanFullName, context, fn }: {
        beanFullName: any;
        context: any;
        fn: any;
    }): Promise<any>;
    executeBean({ locale, subdomain, beanModule, beanFullName, context, fn, transaction, instance, }: {
        locale?: string;
        subdomain?: string;
        beanModule?: string;
        beanFullName?: string;
        context?: any;
        fn?: IExecuteBeanCallback | string;
        transaction?: boolean;
        instance?: boolean;
    }): Promise<any>;
    executeBeanIsolate({ locale, subdomain, beanModule, beanFullName, context, fn, transaction, ctxParent, instance, }: {
        locale?: string;
        subdomain?: string | null;
        beanModule?: string;
        beanFullName?: string;
        context?: any;
        fn?: IExecuteBeanCallback | string;
        transaction?: boolean;
        ctxParent?: Partial<CabloyContext>;
        instance?: boolean;
    }): Promise<any>;
    performAction({ innerAccess, method, url, query, params, headers, body }: any): Promise<any>;
    getDbOriginal(): any;
    createDatabase(): any;
}
//# sourceMappingURL=utilCtx.d.ts.map