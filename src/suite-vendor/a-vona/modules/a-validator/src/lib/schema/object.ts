import { Constructable } from 'vona';
import { ValidatorOptions } from '../types/validatorOptions.js';
import { schema } from './schema.js';
import { z } from 'zod';

export function schemaObject<T>(classType: Constructable<T>, options?: Partial<ValidatorOptions>): z.ZodSchema<T> {
  return schema(classType, options);
}
