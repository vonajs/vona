import type { Next } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type { TypeCachingActionOptions } from '../types/caching.ts';
import { isNil } from '@cabloy/utils';
import { BeanAopMethodBase, beanFullNameFromOnionName } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';
import { combineCachingKey } from '../lib/utils.ts';

export interface IAopMethodOptionsCachingDel extends IDecoratorAopMethodOptions, TypeCachingActionOptions {}

@AopMethod<IAopMethodOptionsCachingDel>()
export class AopMethodCachingDel extends BeanAopMethodBase implements IAopMethodExecute {
  async execute(options: IAopMethodOptionsCachingDel, args: [], next: Next, receiver: any, prop: string): Promise<any> {
    // next
    const value = await next();
    // key
    const key = combineCachingKey(options, args, receiver, prop);
    if (isNil(key) || key === false || key === '') return value;
    // cache
    const cache = this.bean.summer.cache(beanFullNameFromOnionName(options.cacheName, 'summerCache'));
    await cache.del(key, options);
    // ok
    return value;
  }
}
