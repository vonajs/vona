import type { IZodRefineRecord } from 'vona-module-a-zod';
import type z from 'zod';

export function schemaZodRefine<T extends keyof IZodRefineRecord>(zodRefineName: T, options?: Partial<IZodRefineRecord[T]>) {
  return function (schema: z.ZodSchema): z.ZodSchema {
    return schema.superRefine(async (value, refinementCtx) => {
      console.log(value);
    });
  };
}
