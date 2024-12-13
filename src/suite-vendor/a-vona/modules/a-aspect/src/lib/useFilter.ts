import { UseMiddlewareLike } from 'vona';
import { IFilterRecordLocal } from '../types/filter.js';

export function UseFilter<T extends keyof IFilterRecordLocal>(
  filterName: T,
  options?: Partial<IFilterRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('filter', filterName, options);
}
