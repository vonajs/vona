import type z from 'zod';

export function schemaOrder<T extends z.ZodType>(order: number) {
  return function (schema: T): T {
    return schema.openapi({ rest: { order } });
  };
}
