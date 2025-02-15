import type { IDecoratorGuardOptions } from '../../types/guard.js';
import { createBeanDecorator } from 'vona';

export function Guard<T extends IDecoratorGuardOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('guard', options);
}
