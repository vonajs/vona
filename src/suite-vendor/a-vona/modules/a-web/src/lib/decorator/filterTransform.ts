import type { IDecoratorFilterTransformOptions } from '../../types/filterTransform.ts';
import { createBeanDecorator } from 'vona';

export function FilterTransform<T extends IDecoratorFilterTransformOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('filterTransform', options);
}
