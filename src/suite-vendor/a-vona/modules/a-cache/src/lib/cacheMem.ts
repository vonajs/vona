import { createBeanDecorator } from 'vona';
import type { IDecoratorCacheMemOptions } from '../types/cacheMem.js';

export function CacheMem(options?: IDecoratorCacheMemOptions): ClassDecorator {
  return createBeanDecorator('cacheMem', options);
}
