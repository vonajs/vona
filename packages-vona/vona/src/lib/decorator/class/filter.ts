import { IDecoratorFilterOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Filter<T extends IDecoratorFilterOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('filter', options);
}
