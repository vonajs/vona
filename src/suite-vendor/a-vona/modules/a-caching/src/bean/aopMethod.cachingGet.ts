import type { Next } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type { TypeCachingActionOptions } from '../types/caching.ts';
import { isNil } from '@cabloy/utils';
import { BeanAopMethodBase, beanFullNameFromOnionName } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';
import { combineKey } from '../lib/caching.ts';

export interface IAopMethodOptionsCachingGet extends IDecoratorAopMethodOptions, TypeCachingActionOptions {}

@AopMethod<IAopMethodOptionsCachingGet>()
export class AopMethodCachingGet extends BeanAopMethodBase implements IAopMethodExecute {
  async execute(options: IAopMethodOptionsCachingGet, args: [], next: Next, receiver: any, prop: string): Promise<any> {
    // key
    const key = combineKey(options, args, receiver, prop);
    if (isNil(key) || key === false || key === '') return next();
    // cache
    const cache = this.bean.summer.cache(beanFullNameFromOnionName(options.cacheName, 'summerCache'));
    return await cache.get(key, Object.assign({}, options, { get: () => {
      return next();
    } }));
  }
}
