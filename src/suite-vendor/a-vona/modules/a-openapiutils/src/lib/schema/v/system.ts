import type { Constructable } from 'vona';
import type { ISchemaObjectOptions } from 'vona-module-a-openapi';
import type { SchemaLike } from '../../../types/decorator.ts';
import { isNil } from '@cabloy/utils';
import { coerceWithNil } from '@cabloy/zod-query';
import { z } from 'zod';
import { $locale } from '../../../.metadata/index.ts';
import { $schema, $schemaLazy, makeSchemaLike } from '../makeSchemaLikes.ts';

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

export function schemaLazy<T>(...schemaLikes: SchemaLike<T>[]) {
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

export function schemaStrictObject() {
  return function (schema: z.ZodObject): z.ZodObject {
    return z.strictObject(schema.shape);
  };
}

export function schemaLooseObject() {
  return function (schema: z.ZodObject): z.ZodObject {
    return z.looseObject(schema.shape);
  };
}

export function schemaRequired(params?: string | z.core.$ZodStringParams) {
  params = params || $locale('ZodErrorRequired');
  return function (schema: z.ZodType): z.ZodType {
    schema._zod.def.error = z.util.normalizeParams(params).error;
    return schema;
  };
}
