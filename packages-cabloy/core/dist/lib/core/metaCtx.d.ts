import { CtxUtil } from '../utils/utilCtx.js';
import { CtxMockUtil } from '../utils/mockUtilCtx.js';
import { BeanSimple } from '../bean/beanSimple.js';
export declare class CtxMeta extends BeanSimple {
    util: CtxUtil;
    mockUtil: CtxMockUtil;
    /** dynamic middleware options */
    middlewares: Record<string, any>;
    protected __init__(): void;
    getMiddlewareOptions(middlewareName: any): any;
}
//# sourceMappingURL=metaCtx.d.ts.map