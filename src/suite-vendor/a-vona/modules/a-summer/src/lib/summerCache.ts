import { createBeanDecorator } from 'vona';
import type { IDecoratorSummerCacheOptions } from '../types/summerCache.js';

export function SummerCache(options?: IDecoratorSummerCacheOptions): ClassDecorator {
  return createBeanDecorator('summerCache', options);
}
