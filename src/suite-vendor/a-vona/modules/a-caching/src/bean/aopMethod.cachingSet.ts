import type { Next } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type { TypeCacheValueFn, TypeCachingActionOptions } from '../types/caching.ts';
import { isNil } from '@cabloy/utils';
import { BeanAopMethodBase, beanFullNameFromOnionName } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';
import { combineCachingKey, combineCachingValue } from '../lib/utils.ts';

export interface IAopMethodOptionsCachingSet extends IDecoratorAopMethodOptions, TypeCachingActionOptions {
  cacheValue?: any;
  cacheValueFn?: TypeCacheValueFn | string;
}

@AopMethod<IAopMethodOptionsCachingSet>()
export class AopMethodCachingSet extends BeanAopMethodBase implements IAopMethodExecute {
  async execute(options: IAopMethodOptionsCachingSet, args: [], next: Next, receiver: any, prop: string): Promise<any> {
    // next
    let value = await next();
    // key
    const key = combineCachingKey(options, args, receiver, prop);
    if (isNil(key) || key === false || key === '') return value;
    // value
    value = combineCachingValue(options, args, receiver, prop, value);
    // cache
    const cache = this.bean.summer.cache(beanFullNameFromOnionName(options.cacheName, 'summerCache'));
    await cache.set(value, key);
    // ok
    return value;
  }
}
