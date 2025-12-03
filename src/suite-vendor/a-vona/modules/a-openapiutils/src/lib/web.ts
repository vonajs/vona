import type { IApiPathRecord, IFilterTransformRecord, TypeSchemaObjectExtensionFieldFilterTransform } from 'vona-module-a-web';
import { combineParamsAndQuery } from '@cabloy/utils';

export function $apiPath<K extends keyof IApiPathRecord>(path: K): K {
  return path;
}

export function $apiPathAndCombineParamsAndQuery<K extends keyof IApiPathRecord>(path: K, options?: { params?: object; query?: object }): string {
  return combineParamsAndQuery(path, options);
}

export function $makeFilterTransform<T extends keyof IFilterTransformRecord>(
  filterTransformName: T,
  options?: Partial<IFilterTransformRecord[T]>,
): TypeSchemaObjectExtensionFieldFilterTransform {
  return [filterTransformName, options];
};
