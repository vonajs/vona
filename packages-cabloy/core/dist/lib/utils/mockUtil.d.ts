import { BeanSimple } from '../bean/beanSimple.js';
export declare class AppMockUtil extends BeanSimple {
    parseUrlFromModuleInfo(moduleInfo: any, apiPrefix?: string | boolean): string | null;
    mockUrl(moduleInfo: any, url: any, apiPrefix?: string | boolean): string;
    mockCtx(options?: {
        locale?: string;
        subdomain?: string | null;
        module?: string;
    }): Promise<import("../../index.js").CabloyContext>;
}
//# sourceMappingURL=mockUtil.d.ts.map