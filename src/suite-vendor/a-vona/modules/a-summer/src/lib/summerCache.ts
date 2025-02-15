import type { IDecoratorSummerCacheOptions } from '../types/summerCache.js';
import { createBeanDecorator } from 'vona';

export function SummerCache(options?: IDecoratorSummerCacheOptions): ClassDecorator {
  return createBeanDecorator('summerCache', options);
}
