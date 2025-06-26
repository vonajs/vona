import type { Next, NextSync } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type { TypeCachingActionOptions } from '../types/caching.ts';
import { BeanAopMethodBase, beanFullNameFromOnionName } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsCachingGet extends IDecoratorAopMethodOptions, TypeCachingActionOptions {}

@AopMethod<IAopMethodOptionsCachingGet>()
export class AopMethodCachingGet extends BeanAopMethodBase implements IAopMethodExecute {
  async execute(options: IAopMethodOptionsCachingGet, _args: [], next: Next, _receiver: any, _prop: string): Promise<any> {
    // key
    // cache
    const cache = this.bean.summer.cache(beanFullNameFromOnionName(options.cacheName, 'summerCache'));
    return await cache.get(key, Object.assign({}, options, { get: () => {
      return next();
    } }));
  }
}
