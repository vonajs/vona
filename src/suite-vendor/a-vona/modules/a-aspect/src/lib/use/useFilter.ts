import type { IFilterRecordLocal } from '../../types/filter.js';
import { UseOnionBase } from './useOnionBase.js';

export function UseFilter<T extends keyof IFilterRecordLocal>(
  filterName: T,
  options?: Partial<IFilterRecordLocal[T]>,
): ClassDecorator & MethodDecorator {
  return UseOnionBase('filter', filterName, options);
}
