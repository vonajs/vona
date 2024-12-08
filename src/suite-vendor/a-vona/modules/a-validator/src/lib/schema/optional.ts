import { z } from 'zod';

export function schemaOptional(schema: z.ZodSchema): z.ZodSchema {
  return schema.optional();
}
