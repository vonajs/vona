import type { Constructable } from 'vona';
import type { SchemaLike } from 'vona-module-a-openapiutils';
import type { ISchemaObjectOptions } from '../../../types/decorator.ts';
import { isNil } from '@cabloy/utils';
import { coerceWithNil } from '@cabloy/zod-query';
import { z } from 'zod';
import { makeSchemaLike } from '../makeSchemaLikes.ts';
import { $schema, $schemaLazy } from '../schema.ts';

export function schemaDefault(defaultValue: any | Function) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.default(defaultValue);
  };
}

export function schemaOptional() {
  return function (schema: z.ZodType): z.ZodType {
    return schema.optional();
  };
}

export function schemaLazy<T>(...schemaLikes: SchemaLike[]) {
  return function (_schema?: z.ZodType): z.ZodType<T> {
    return $schemaLazy(...schemaLikes);
  };
}

export function schemaObject<T>(classType: Constructable<T>, options?: ISchemaObjectOptions) {
  return function (_schema?: z.ZodType): z.ZodType<T> {
    return $schema(classType, options);
  };
}

export function schemaArray(schemaLike?: SchemaLike, params?: z.core.$ZodArrayParams & { separator?: string }) {
  return function (schema: z.ZodType): z.ZodType {
    return z.preprocess(
      val => {
        val = coerceWithNil(val);
        if (isNil(val)) return val;
        if (typeof val !== 'string') return val;
        if (val.startsWith('[') && val.endsWith(']')) return JSON.parse(val);
        return val.split(params?.separator ?? ',');
      },
      z.array(makeSchemaLike(schemaLike ?? schema, z.any()), params),
      // z.array(makeSchemaLike(schemaLike, schema), params),
    );
  };
}
