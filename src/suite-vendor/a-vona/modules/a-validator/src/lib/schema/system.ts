import { coerceWithNil } from '@cabloy/zod-query';
import { Constructable, isNil } from 'vona';
import { z } from 'zod';
import { SchemaLike } from '../types/decorator.js';
import { ValidatorOptions } from '../types/validatorOptions.js';
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

export function schemaObject<T>(classType: Constructable<T>, options?: Partial<ValidatorOptions>) {
  return function (_schema: z.ZodSchema): z.ZodSchema<T> {
    return schema(classType, options);
  };
}

export function schemaArray(schemaLike?: SchemaLike, params?: z.RawCreateParams & { separator?: string }) {
  return function (schema: z.ZodSchema): z.ZodSchema {
    return z.preprocess(
      val => {
        val = coerceWithNil(val);
        if (isNil(val)) return val;
        if (typeof val !== 'string') return val;
        if (isNil(params?.separator) && val[0] === '[') return JSON.parse(val);
        return val.split(params?.separator ?? ',');
      },
      z.array(makeSchemaLike(schemaLike, schema), params),
    );
  };
}
