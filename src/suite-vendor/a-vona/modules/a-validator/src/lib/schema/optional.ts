import { z } from 'zod';

export function schemaOptional() {
  return function (schema: z.ZodSchema): z.ZodSchema {
    return schema.optional();
  };
}
