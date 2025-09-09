import type { IDecoratorZodRefineOptions } from '../types/zodRefine.ts';
import { createBeanDecorator } from 'vona';

export function ZodRefine<T extends IDecoratorZodRefineOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('zodRefine', options);
}
