import type { BeanBase } from 'vona';
import type { TypeCachingActionOptions } from '../types/caching.ts';
import { cast } from 'vona';

export function combineKey(options: TypeCachingActionOptions, args: [], receiver: BeanBase, prop: string) {
  if (options.cacheKeyFn) {
    if (typeof options.cacheKeyFn === 'string') {
      if (!receiver[options.cacheKeyFn]) {
        throw new Error(`cacheKeyFn not found: ${cast(receiver).$beanFullName}.${prop}`);
      }
      return receiver[options.cacheKeyFn](options, args, receiver, prop);
    }
  }
}
