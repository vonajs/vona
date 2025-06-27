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
  cacheKey(args: any[], prop: string, options: TypeCachingActionOptions, _receiver: BeanBase) {
    return `${this.$beanFullName}_${options.cacheProp ?? prop}_${getKeyHash(args)}`;
  }

  // cacheKey: '#!# concat(prop,args[0])'
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

  // +options.cacheProp+getKeyHash(args)
  @Caching.get({ cacheName: 'test-vona:test', cacheProp: 'test', cacheKey: '#!#get(self,"$beanFullName")+"_"+options.cacheProp+"_"+hashkey(args)' })
  async get3(_id: number): Promise<TSummerCacheTestData> {
    return undefined as any;
  }
}
