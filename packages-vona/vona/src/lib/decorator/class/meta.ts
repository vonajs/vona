import { IDecoratorMetaOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Meta<T extends IDecoratorMetaOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('meta', options);
}
