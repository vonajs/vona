import type { BeanBase } from 'vona';
import type { TypeCachingActionOptions } from '../types/caching.ts';
import { evaluateExpressions } from '@cabloy/utils';
import { cast } from 'vona';
import { getKeyHash } from 'vona-module-a-cache';

export function combineCachingKey(options: TypeCachingActionOptions, args: [], receiver: BeanBase, prop: string) {
  // cacheKeyFn
  if (options.cacheKeyFn) {
    if (typeof options.cacheKeyFn === 'string') {
      if (!receiver[options.cacheKeyFn]) {
        throw new Error(`cacheKeyFn not found: ${cast(receiver).$beanFullName}#${options.cacheKeyFn}`);
      }
      return receiver[options.cacheKeyFn](args, prop, options, receiver);
    }
    return options.cacheKeyFn.call(receiver, args, prop, options, receiver);
  }
  // cacheKey
  if (options.cacheKey) {
    return evaluateExpressions(options.cacheKey, {
      args,
      prop,
      options,
      self: receiver,
    });
  }
  // default
  return `${cast(receiver).$beanFullName}_${options.cacheProp ?? prop}_${getKeyHash(args)}`;
}

export function combineCachingValue(options: TypeCachingActionOptions, args: [], receiver: BeanBase, prop: string) {

}
