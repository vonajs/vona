import type { IDecoratorCacheMemOptions } from '../types/cacheMem.ts';
import { createBeanDecorator } from 'vona';

export function CacheMem(options?: IDecoratorCacheMemOptions): ClassDecorator {
  return createBeanDecorator('cacheMem', options);
}
