import { IDecoratorGuardOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Guard<T extends IDecoratorGuardOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('guard', options);
}
