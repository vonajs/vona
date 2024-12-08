import { z } from 'zod';

export function schemaDefault<T>(defaultValue: T) {
  return function (schema: z.ZodSchema): z.ZodSchema {
    return schema.default(defaultValue);
  };
}
