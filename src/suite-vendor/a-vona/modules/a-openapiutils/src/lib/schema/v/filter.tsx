import type { IFilterTransformOptionsDateRange, IFilterTransformRecord, ISchemaObjectExtensionFieldFilter } from 'vona-module-a-web';
import type z from 'zod';
import React from 'react';

export function schemaFilter(options: ISchemaObjectExtensionFieldFilter) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({
      filter: options,
    });
  };
}

export function schemaFilterTransform<T extends keyof IFilterTransformRecord>(
  filterTransformName: T,
  options?: Partial<IFilterTransformRecord[T]>,
) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({
      filter: {
        transform: [filterTransformName, options],
      },
    });
  };
}

export function schemaFilterDateRange(options?: Partial<IFilterTransformOptionsDateRange>) {
  const separator = options?.separator;
  const DateRange = 'dateRange' as any;
  const filterRender = separator ? <DateRange separator={separator}></DateRange> : 'dateRange';
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({
      filter: {
        transform: ['a-web:dateRange', options],
      },
      rest: {
        filter: {
          render: filterRender,
        },
      },
    });
  };
}
