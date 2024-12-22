import { Constructable } from 'vona';
import { z } from 'zod';
import { SchemaLike } from '../types/decorator.js';
import { ISchemaObjectOptions } from '../types/validatorOptions.js';
import { makeSchemaLike } from './makeSchemaLikes.js';
import { schema } from './schema.js';

export function schemaDefault<T>(defaultValue: T) {
  return function (schema: z.ZodSchema): z.ZodSchema {
    return schema.default(defaultValue);
  };
}

export function schemaOptional() {
  return function (schema: z.ZodSchema): z.ZodSchema {
    return schema.optional();
  };
}

export function schemaObject<T>(classType: Constructable<T>, options?: ISchemaObjectOptions) {
  return function (_schema: z.ZodSchema): z.ZodSchema<T> {
    return schema(classType, options);
  };
}

export function schemaArray(schemaLike?: SchemaLike, params?: z.RawCreateParams) {
  return function (schema: z.ZodSchema): z.ZodSchema {
    return z.array(makeSchemaLike(schemaLike, schema), params);
  };
}
