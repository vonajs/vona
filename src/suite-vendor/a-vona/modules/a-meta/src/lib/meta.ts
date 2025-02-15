import { createBeanDecorator } from 'vona';
import type { IDecoratorMetaOptions } from '../types/meta.js';

export function Meta<T extends IDecoratorMetaOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('meta', options);
}
