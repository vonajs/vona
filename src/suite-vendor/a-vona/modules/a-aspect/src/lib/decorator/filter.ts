import type { IDecoratorFilterOptions } from '../../types/filter.js';
import { createBeanDecorator } from 'vona';

export function Filter<T extends IDecoratorFilterOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('filter', options);
}
