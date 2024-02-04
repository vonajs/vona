import { CtxMeta } from '../../lib/core/metaCtx.js';
import { IModule } from '../interface/module.js';
export interface ContextBase {
    get module(): IModule;
    get meta(): CtxMeta;
    get db(): any;
    set db(value: any);
    get dbMeta(): any;
    set dbMeta(metaCaller: any);
    get transaction(): any;
    get innerAccess(): any;
    set innerAccess(value: any);
    get dbLevel(): any;
    set dbLevel(value: any);
    get subdomain(): any;
    set subdomain(value: any);
    get ctxCaller(): any;
    set ctxCaller(value: any);
    get cache(): any;
    tail(cb: any): any;
    tailDone(): Promise<any>;
    get tailCallbacks(): any;
    successMore(list: any, index: any, size: any): any;
    getPayload(options?: any): Promise<any>;
}
//# sourceMappingURL=contextBase.d.ts.map