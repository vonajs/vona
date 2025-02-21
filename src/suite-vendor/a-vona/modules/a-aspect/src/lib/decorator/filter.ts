import type { IDecoratorFilterOptions } from '../../types/filter.ts';
import { createBeanDecorator } from 'vona';

export function Filter<T extends IDecoratorFilterOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('filter', options);
}
