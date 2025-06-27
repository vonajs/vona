import type { Next, NextSync } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type { TypeCacheKeyFn, TypeCachingActionOptions } from '../types/caching.ts';
import { BeanAopMethodBase } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsCachingSet extends IDecoratorAopMethodOptions, TypeCachingActionOptions {
  cacheValue?: any;
  cacheValueFn?: TypeCacheKeyFn | string;
}

@AopMethod<IAopMethodOptionsCachingSet>()
export class AopMethodCachingSet extends BeanAopMethodBase implements IAopMethodExecute {
  execute(_options: IAopMethodOptionsCachingSet, _args: [], next: Next | NextSync, _receiver: any, _prop: string): Promise<any> | any {
    // next
    return next();
  }
}
