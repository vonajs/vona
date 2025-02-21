import type { IDecoratorMetaOptions } from '../types/meta.ts';
import { createBeanDecorator } from 'vona';

export function Meta<T extends IDecoratorMetaOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('meta', options);
}
