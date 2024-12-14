import { TypeUseMiddlewareGlobalLikeOptions, UseMiddlewareGlobalLike } from 'vona';
import { IFilterRecordGlobal } from '../../types/filter.js';

export function UseFilterGlobal<T extends keyof IFilterRecordGlobal>(
  filterName: T,
  options?: Partial<TypeUseMiddlewareGlobalLikeOptions<IFilterRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobalLike('filter', filterName, options);
}
