import { IDecoratorSummerCacheOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function SummerCache<T extends IDecoratorSummerCacheOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('summerCache', options);
}
