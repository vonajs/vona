import { IFilterRecordGlobal } from '../../types/filter.js';
import { TypeUseMiddlewareGlobalLikeOptions } from '../../types/middleware.js';
import { UseOnionGlobalBase } from './useOnionGlobalBase.js';

export function UseFilterGlobal<T extends keyof IFilterRecordGlobal>(
  filterName: T,
  options?: Partial<TypeUseMiddlewareGlobalLikeOptions<IFilterRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('filter', filterName, options);
}
