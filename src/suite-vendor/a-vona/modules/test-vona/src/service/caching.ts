import type { TypeCachingActionOptions } from 'vona-module-a-caching';
import type { TSummerCacheTestData } from '../bean/summerCache.test.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';
import { getKeyHash } from 'vona-module-a-cache';
import { Caching } from 'vona-module-a-caching';

function cacheKeyFn(this: ServiceCaching, args: [], prop: string, options: TypeCachingActionOptions): any {
  return `${this.$beanFullName}_${options.cacheProp ?? prop}_${getKeyHash(args)}`;
}

@Service()
export class ServiceCaching extends BeanBase {
  cacheKey(args: any[], prop: string, options: TypeCachingActionOptions) {
    return `${this.$beanFullName}_${options.cacheProp ?? prop}_${getKeyHash(args)}`;
  }

  cacheKeySet(args: any[], prop: string, options: TypeCachingActionOptions) {
    return `${this.$beanFullName}_${options.cacheProp ?? prop}_${getKeyHash(args.slice(0, -1))}`;
  }

  cacheValueSet(_value: any, args: any[], _prop: string, _options: TypeCachingActionOptions) {
    return args[args.length - 1];
  }

  @Caching.get({ cacheName: 'test-vona:test', cacheProp: 'test', cacheKeyFn: 'cacheKey' })
  async get(id: number): Promise<TSummerCacheTestData> {
    return {
      id,
      name: `name_${id}`,
    };
  }

  @Caching.get({ cacheName: 'test-vona:test', cacheProp: 'test', cacheKeyFn })
  async get2(_id: number): Promise<TSummerCacheTestData> {
    return undefined as any;
  }

  @Caching.get({ cacheName: 'test-vona:test', cacheProp: 'test', cacheKey: 'cel://join([get(self,"$beanFullName"),options.cacheProp,hashkey(args)],"_")' })
  async get3(_id: number): Promise<TSummerCacheTestData> {
    return undefined as any;
  }

  // default cacheKey
  @Caching.get({ cacheName: 'test-vona:test', cacheProp: 'test' })
  async get4(_id: number): Promise<TSummerCacheTestData> {
    return undefined as any;
  }

  @Caching.set({ cacheName: 'test-vona:test', cacheProp: 'test', cacheKeyFn: 'cacheKeySet', cacheValueFn: 'cacheValueSet' })
  async set(_id: number, _value: TSummerCacheTestData): Promise<void> {
    // do nothing
  }

  //
  @Caching.set({ cacheName: 'test-vona:test', cacheProp: 'test', cacheKey: 'cel://join([get(self,"$beanFullName"),options.cacheProp,hashkey([args[0]])],"_")', cacheValue: 'cel://{"id": args[1].id, "name": args[1].name}' })
  async set2(_id: number, _value: TSummerCacheTestData): Promise<void> {
    // do nothing
  }

  @Caching.set({ cacheName: 'test-vona:test', cacheProp: 'test', cacheKeyFn: 'cacheKeySet' })
  async set3(_id: number, value: TSummerCacheTestData): Promise<TSummerCacheTestData> {
    return value;
  }

  @Caching.del({ cacheName: 'test-vona:test', cacheProp: 'test' })
  async del(_id: number): Promise<void> {
    // do nothing
  }

  @Caching.clear({ cacheName: 'test-vona:test' })
  async clear(): Promise<void> {
    // do nothing
  }
}
