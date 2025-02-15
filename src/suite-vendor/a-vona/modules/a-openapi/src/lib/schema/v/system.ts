import type { Constructable } from 'vona';
import { z } from 'zod';
import { coerceWithNil } from '@cabloy/zod-query';
import type { ISchemaObjectOptions, SchemaLike } from '../../../types/decorator.js';
import { schema } from '../schema.js';
import { makeSchemaLike } from '../makeSchemaLikes.js';
import { isNil } from '@cabloy/utils';

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

export function schemaArray(schemaLike?: SchemaLike, params?: z.RawCreateParams & { separator?: string }) {
  return function (_schema: z.ZodSchema): z.ZodSchema {
    return z.preprocess(
      val => {
        val = coerceWithNil(val);
        if (isNil(val)) return val;
        if (typeof val !== 'string') return val;
        if (isNil(params?.separator) && val[0] === '[') return JSON.parse(val);
        return val.split(params?.separator ?? ',');
      },
      z.array(makeSchemaLike(schemaLike, z.any()), params),
      // z.array(makeSchemaLike(schemaLike, schema), params),
    );
  };
}
