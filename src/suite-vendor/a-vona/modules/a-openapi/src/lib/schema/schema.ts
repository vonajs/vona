import type { Constructable } from 'vona';
import type { SchemaLike } from 'vona-module-a-openapiutils';
import type { ISchemaObjectOptions } from '../../types/decorator.ts';
import type { TypeOpenapiMetadata } from '../../types/rest.ts';
import { isClass } from '@cabloy/utils';
import { appMetadata, appResource, cast } from 'vona';
import { SymbolDecoratorRule } from 'vona-module-a-openapiutils';
import { z } from 'zod';
import { makeSchemaLikes } from './makeSchemaLikes.ts';

export function $schema(schemaLike: z.ZodSchema): z.ZodSchema;
export function $schema(classType: StringConstructor): z.ZodString;
export function $schema(classType: NumberConstructor): z.ZodNumber;
export function $schema(classType: BooleanConstructor): z.ZodBoolean;
export function $schema(classType: DateConstructor): z.ZodDate;
export function $schema(classType: BigIntConstructor): z.ZodBigInt;
export function $schema(classType: ArrayConstructor): z.ZodArray<z.ZodAny>;
export function $schema<T>(classType: Constructable<T>, options?: ISchemaObjectOptions): z.ZodSchema<T>;
export function $schema(classType: any, options?: ISchemaObjectOptions): any {
  if (!classType) return z.any();
  if (classType.parseAsync) return classType;
  if (classType.name === 'String') return z.string();
  if (classType.name === 'Number') return z.number();
  if (classType.name === 'Boolean') return z.boolean();
  if (classType.name === 'Date') return z.date();
  if (classType.name === 'BigInt') return z.bigint();
  if (classType.name === 'Array') return z.array(z.any());
  // check if object
  const rules = classType.prototype ? appMetadata.getMetadata(SymbolDecoratorRule, classType.prototype) : undefined;
  if (!rules) {
    // not object
    return z.any();
  }
  // object
  let schema = _createSchemaObject(rules, options);
  // refId
  const beanOptions = appResource.getBean(classType);
  if (beanOptions) {
    const openapi: TypeOpenapiMetadata = cast(beanOptions.options)?.openapi;
    schema = schema.openapi(beanOptions.beanFullName, openapi);
  }
  return schema as any;
}

export function $schemaLazy<T>(...schemaLikes: SchemaLike[]): z.ZodSchema<T> {
  return z.lazy(() => {
    return _createSchemaLazy(schemaLikes);
  });
}

function _createSchemaLazy(schemaLikes: SchemaLike[]) {
  const classType = schemaLikes[schemaLikes.length - 1];
  schemaLikes = schemaLikes.slice(0, schemaLikes.length - 1);
  const classType2 = _prepareClassType(classType as any);
  return makeSchemaLikes(schemaLikes, $schema(classType2));
}

function _createSchemaObject(rules: {}, options?: ISchemaObjectOptions) {
  let schema = z.object(rules as z.ZodRawShape);
  if (options?.passthrough) schema = schema.passthrough() as any;
  if (options?.strict) schema = schema.strict() as any;
  return schema;
}

function _prepareClassType<T>(classType: (() => Constructable<T>) | Constructable<T>): Constructable<T> {
  return isClass(classType) ? classType as Constructable<T> : cast(classType)();
}
