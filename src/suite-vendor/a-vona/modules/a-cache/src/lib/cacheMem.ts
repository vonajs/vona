import { createBeanDecorator } from 'vona';
import { IDecoratorCacheMemOptions } from '../types/cacheMem.js';

export function CacheMem(options?: IDecoratorCacheMemOptions): ClassDecorator {
  return createBeanDecorator('cacheMem', options);
}
