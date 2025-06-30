import type { Next } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type { TypeCachingActionOptions } from '../types/caching.ts';
import { BeanAopMethodBase, beanFullNameFromOnionName } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';
import { combineCachingKey, isCachingKeyValid } from '../lib/utils.ts';

export interface IAopMethodOptionsCachingGet extends IDecoratorAopMethodOptions, TypeCachingActionOptions {}

@AopMethod<IAopMethodOptionsCachingGet>()
export class AopMethodCachingGet extends BeanAopMethodBase implements IAopMethodExecute {
  async execute(options: IAopMethodOptionsCachingGet, args: [], next: Next, receiver: any, prop: string): Promise<any> {
    // key
    const key = combineCachingKey(options, args, receiver, prop);
    if (!isCachingKeyValid(key)) return next();
    // cache
    const cache = this.bean.summer.cache(beanFullNameFromOnionName(options.cacheName, 'summerCache'));
    return await cache.get(key, Object.assign({}, options, { get: () => {
      return next();
    } }));
  }
}
