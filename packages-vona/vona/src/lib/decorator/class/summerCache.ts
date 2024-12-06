import { IDecoratorSummerCacheOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function SummerCache(options?: IDecoratorSummerCacheOptions): ClassDecorator {
  if (!options) options = {};
  if (!options.preset && !options.mode) {
    options = { ...options, preset: 'all' };
  }
  return createBeanDecorator('summerCache', options);
}
