import { BeanSimple } from '../bean/beanSimple.js';
export declare class CtxMockUtil extends BeanSimple {
    login({ auth, password }: {
        auth: any;
        password?: string | undefined;
    }): Promise<any>;
    logout(): Promise<any>;
    catchError(fnMethod: any, fnError: any): Promise<any>;
}
//# sourceMappingURL=mockUtilCtx.d.ts.map