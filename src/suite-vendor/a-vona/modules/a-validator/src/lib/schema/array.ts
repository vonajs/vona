import { isNil } from 'vona';
import { z } from 'zod';
import { coerceWithNil } from '@cabloy/zod-query';
import { SchemaLike } from '../types/decorator.js';
import { makeSchemaLike } from './makeSchemaLikes.js';

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
