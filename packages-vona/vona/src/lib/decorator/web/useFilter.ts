import { IFilterRecordLocal } from '../../../types/interface/filter.js';
import { UseMiddlewareLike } from './useMiddlewareLike.js';

export function UseFilter<T extends keyof IFilterRecordLocal>(
  filterName: T,
  options?: Partial<IFilterRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareLike('filter', filterName, options);
}
