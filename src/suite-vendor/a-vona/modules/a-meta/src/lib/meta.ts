import type { IDecoratorMetaOptions } from '../types/meta.js';
import { createBeanDecorator } from 'vona';

export function Meta<T extends IDecoratorMetaOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('meta', options);
}
