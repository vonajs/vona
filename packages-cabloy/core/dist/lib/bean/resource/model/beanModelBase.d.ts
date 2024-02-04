import { BeanModelBaseInner } from './beanModelBaseInner.js';
export declare class BeanModelBase extends BeanModelBaseInner {
    get __cacheName(): {
        module: string;
        name: string;
    };
    get __cacheKeyAux(): string | undefined;
    get __cacheNotKey(): boolean;
    mget(ids: any): Promise<any>;
    get(where: any, ...args: any[]): Promise<any>;
    update(where: any, ...args: any[]): Promise<any>;
    delete(where: any, ...args: any[]): Promise<any>;
    __mget_select(keys: any): Promise<any>;
    __get_notkey(where: any, ...args: any[]): any;
    __get_key(where: any, ...args: any[]): Promise<any>;
    __checkCacheKeyValid(where: any): boolean;
    __checkCacheNotKeyDataValid(where: any, data: any): boolean;
    __deleteCache_key(where: any): Promise<void>;
    __deleteCache_notkey(where: any): Promise<void>;
    __getCacheInstance(): any;
    clearCache(): Promise<void>;
    __cacheExists(): boolean;
}
//# sourceMappingURL=beanModelBase.d.ts.map