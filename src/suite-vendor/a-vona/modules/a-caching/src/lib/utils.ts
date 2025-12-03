import type { BeanBase } from 'vona';
import type { IAopMethodOptionsCachingSet } from '../bean/aopMethod.cachingSet.ts';
import type { ICachingActionKeyInfo, TypeCachingActionOptions } from '../types/caching.ts';
import { evaluateExpressions, isNil } from '@cabloy/utils';
import { cast } from 'vona';
import { getKeyHash } from 'vona-module-a-cache';

export function combineCachingKey(info: ICachingActionKeyInfo, options: TypeCachingActionOptions) {
  const { args, prop, receiver, intention } = info;
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
      app: cast(receiver).app,
      ctx: cast(receiver).ctx,
    });
  }
  // default: only use first arg
  return `${cast(receiver).$beanFullName}_${options.cacheProp ?? prop}_${getKeyHash(args[0])}`;
}

export function combineCachingValue(options: IAopMethodOptionsCachingSet, args: any[], receiver: BeanBase, prop: string, result: any) {
  // cacheValueFn
  if (!isNil(options.cacheValueFn)) {
    if (typeof options.cacheValueFn === 'string') {
      if (!receiver[options.cacheValueFn]) {
        throw new Error(`cacheValueFn not found: ${cast(receiver).$beanFullName}#${options.cacheValueFn}`);
      }
      return receiver[options.cacheValueFn](result, args, prop, options, receiver);
    }
    return options.cacheValueFn.call(receiver, result, args, prop, options, receiver);
  }
  // cacheValue
  if (!isNil(options.cacheValue)) {
    return evaluateExpressions(options.cacheValue, {
      result,
      args,
      prop,
      options,
      self: receiver,
      app: cast(receiver).app,
      ctx: cast(receiver).ctx,
    });
  }
  // default
  return args[1];
}

export function isCachingKeyValid(key: any) {
  return !isNil(key) && key !== false && key !== '';
}
