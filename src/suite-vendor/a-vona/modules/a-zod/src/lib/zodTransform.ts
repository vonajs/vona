import type { IDecoratorZodTransformOptions } from '../types/zodTransform.ts';
import { createBeanDecorator } from 'vona';

export function ZodTransform<T extends IDecoratorZodTransformOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('zodTransform', options);
}
