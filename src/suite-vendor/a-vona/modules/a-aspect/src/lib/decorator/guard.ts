import { createBeanDecorator } from 'vona';
import { IDecoratorGuardOptions } from '../../types/guard.js';

export function Guard<T extends IDecoratorGuardOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('guard', options);
}
