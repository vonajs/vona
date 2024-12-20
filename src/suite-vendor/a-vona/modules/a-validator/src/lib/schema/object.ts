import { Constructable } from 'vona';
import { ValidatorOptions } from '../types/validatorOptions.js';
import { z } from 'zod';
import { schema } from './schema.js';

export function schemaObject<T>(classType: Constructable<T>, options?: Partial<ValidatorOptions>) {
  return function (_schema: z.ZodSchema): z.ZodSchema<T> {
    return schema(classType, options);
  };
}
