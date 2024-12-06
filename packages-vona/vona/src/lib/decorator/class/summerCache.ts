import { IDecoratorSummerCacheOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function SummerCache(options?: IDecoratorSummerCacheOptions): ClassDecorator {
  return createBeanDecorator('summerCache', options);
}
