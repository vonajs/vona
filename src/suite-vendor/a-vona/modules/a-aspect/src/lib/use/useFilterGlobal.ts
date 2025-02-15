import type { TypeUseOnionGlobalBaseOptions } from 'vona-module-a-onion';
import type { IFilterRecordGlobal } from '../../types/filter.js';
import { UseOnionGlobalBase } from './useOnionGlobalBase.js';

export function UseFilterGlobal<T extends keyof IFilterRecordGlobal>(
  filterName: T,
  options?: Partial<TypeUseOnionGlobalBaseOptions<IFilterRecordGlobal[T]>>,
): ClassDecorator & MethodDecorator {
  return UseOnionGlobalBase('filter', filterName, options);
}
