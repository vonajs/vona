import { createBeanDecorator } from 'vona';
import { IDecoratorFilterOptions } from '../../types/filter.js';

export function Filter<T extends IDecoratorFilterOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('filter', options);
}
